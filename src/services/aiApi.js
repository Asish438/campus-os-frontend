import api, { IS_DEMO_MODE } from './api';
import { AI_PRESET_ANSWERS } from '../data/demoData';

export const aiApi = {
  // AI Study Assistant query
  askQuestion: async (prompt, courseContext) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 800));
      const lower = prompt.toLowerCase();
      if (lower.includes('arp')) {
        return {
          answer: AI_PRESET_ANSWERS.arp,
          confidence: 0.98,
          sourceMaterial: 'Computer Networks - Tanenbaum & Kurose Ross (Ch. 5 Data Link)',
          suggestedFollowUps: [
            'What is the difference between ARP and RARP?',
            'How to prevent ARP Cache Poisoning attacks?',
            'What does an ARP packet header look like?'
          ]
        };
      } else if (lower.includes('note') || lower.includes('revision') || lower.includes('summarize')) {
        return {
          answer: AI_PRESET_ANSWERS.notes_cn,
          confidence: 0.96,
          sourceMaterial: 'CS501 Lecture Modules 1-4 & BPUT Syllabus',
          suggestedFollowUps: ['Explain TCP 3-way handshake in detail', 'Show subnetting calculation examples']
        };
      } else if (lower.includes('quiz')) {
        return {
          answer: AI_PRESET_ANSWERS.quiz_os,
          confidence: 0.95,
          sourceMaterial: 'Operating System Concepts - Silberschatz & Galvin',
          suggestedFollowUps: ['Explain Banker algorithm step by step', 'What is the working set model?']
        };
      } else if (lower.includes('question') || lower.includes('important') || lower.includes('exam')) {
        return {
          answer: AI_PRESET_ANSWERS.important_questions,
          confidence: 0.97,
          sourceMaterial: 'Previous 5 Years University End-Sem Question Bank',
          suggestedFollowUps: ['Solve Q1 step by step', 'Generate model answers with diagrams']
        };
      } else {
        return {
          answer: `### **AI Study Analysis: "${prompt}"**\n\nBased on your curriculum (${courseContext?.name || 'Computer Science Engineering'}):\n\n1. **Core Concept**:\n   This topic plays a fundamental role in systems engineering and algorithmic complexity.\n\n2. **Practical Campus Laboratory Application**:\n   Implemented during hands-on lab sessions using Linux kernel primitives and network packet inspectors.\n\n3. **Quick Key Takeaway**:\n   Review the mathematical invariants and edge cases commonly evaluated during internal mid-term examinations.`,
          confidence: 0.92,
          sourceMaterial: 'Curriculum Knowledge Base & Standard University Syllabus',
          suggestedFollowUps: ['Explain with real-world example', 'Generate quick practice MCQs']
        };
      }
    }
    return api.post('/ai/study/query', { prompt, courseContext });
  },

  // AI Complaint Classifier
  classifyComplaint: async (description) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600));
      const descLower = description.toLowerCase();
      
      let category = 'General Maintenance';
      let priority = 'Medium';
      let department = 'Estate Operations';

      if (descLower.includes('tap') || descLower.includes('leak') || descLower.includes('water') || descLower.includes('drain') || descLower.includes('flush') || descLower.includes('bathroom') || descLower.includes('shower')) {
        category = 'Plumbing';
        priority = (descLower.includes('leak') || descLower.includes('four days') || descLower.includes('urgent') || descLower.includes('overflow')) ? 'High' : 'Medium';
        department = 'Maintenance';
      } else if (descLower.includes('fan') || descLower.includes('light') || descLower.includes('socket') || descLower.includes('switch') || descLower.includes('power') || descLower.includes('electricity') || descLower.includes('wire')) {
        category = 'Electrical';
        priority = (descLower.includes('spark') || descLower.includes('shock') || descLower.includes('blackout')) ? 'Urgent' : 'Medium';
        department = 'Electrical Maintenance';
      } else if (descLower.includes('wifi') || descLower.includes('wi-fi') || descLower.includes('internet') || descLower.includes('network') || descLower.includes('lan') || descLower.includes('router')) {
        category = 'Network / Wi-Fi';
        priority = 'High';
        department = 'Campus IT Center';
      } else if (descLower.includes('food') || descLower.includes('mess') || descLower.includes('taste') || descLower.includes('meal')) {
        category = 'Mess & Dining';
        priority = 'Medium';
        department = 'Hostel Food Committee';
      } else if (descLower.includes('door') || descLower.includes('lock') || descLower.includes('window') || descLower.includes('bed') || descLower.includes('cupboard') || descLower.includes('chair')) {
        category = 'Carpentry & Furniture';
        priority = 'Low';
        department = 'Civil Infrastructure';
      }

      return {
        category,
        priority,
        department,
        aiConfidence: 0.94,
        suggestedResolutionTime: priority === 'High' ? '24 Hours' : '48 Hours',
        recommendedAssignee: category === 'Plumbing' ? 'Manoj Rout (Plumbing Specialist)' : 'Duty Technician'
      };
    }
    return api.post('/ai/complaint/classify', { description });
  }
};

export default aiApi;
