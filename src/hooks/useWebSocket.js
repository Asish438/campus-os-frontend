import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../services/api';

// Create a singleton client so we don't reconnect on every re-render
let globalStompClient = null;
let subscribers = []; // { id, onMessage, topic }

const initStompClient = () => {
    if (globalStompClient) return globalStompClient;
    
    // We expect API_BASE_URL to end with /api, we replace it with /ws for websocket
    const wsUrl = API_BASE_URL.replace(/\/api\/?$/, '/ws');

    globalStompClient = new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        debug: function (str) {
            console.log('[STOMP] ' + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    globalStompClient.onConnect = function (frame) {
        console.log('[STOMP] Connected: ' + frame);
        // Subscribe all active subscribers
        subscribers.forEach(sub => {
            if (!sub.subscription) {
                sub.subscription = globalStompClient.subscribe(sub.topic, (message) => {
                    if (message.body) {
                        sub.onMessage(JSON.parse(message.body));
                    }
                });
            }
        });
    };

    globalStompClient.onStompError = function (frame) {
        console.error('[STOMP] Broker reported error: ' + frame.headers['message']);
        console.error('[STOMP] Additional details: ' + frame.body);
    };

    globalStompClient.activate();
    return globalStompClient;
};


export const useWebSocket = (topic, onMessage) => {
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        if (!topic) return;
        
        initStompClient();

        // Register this component as a subscriber
        const id = Math.random().toString(36).substring(7);
        const subscriber = { id, topic, onMessage };
        subscribers.push(subscriber);

        // If already connected, subscribe immediately
        if (globalStompClient.connected) {
            subscriber.subscription = globalStompClient.subscribe(topic, (message) => {
                if (message.body) {
                    onMessage(JSON.parse(message.body));
                }
            });
            setIsConnected(true);
        } else {
            // Wait for onConnect callback which will handle it
            const checkConnection = setInterval(() => {
                if (globalStompClient.connected) {
                    setIsConnected(true);
                    clearInterval(checkConnection);
                }
            }, 500);
        }

        // Cleanup on unmount
        return () => {
            if (subscriber.subscription) {
                subscriber.subscription.unsubscribe();
            }
            subscribers = subscribers.filter(s => s.id !== id);
        };
    }, [topic]);

    return { isConnected };
};
