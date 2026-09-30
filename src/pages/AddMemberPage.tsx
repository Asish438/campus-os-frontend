import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Briefcase, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Save 
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { memberService } from '../services/apiService';
import { useToast } from '../context/ToastContext';

export const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    mobile: '',
    email: '',
    address: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pinCode: '',
    occupation: 'Government Employee',
    nomineeName: '',
    nomineeRelation: 'Spouse',
    branch: 'Bhubaneswar Main Branch',
  });

  const [documents, setDocuments] = useState<{
    photo: string | null;
    signature: string | null;
    idProof: string | null;
    addressProof: string | null;
  }>({
    photo: null,
    signature: null,
    idProof: null,
    addressProof: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Validate form fields
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.dob) errs.dob = 'Date of birth is required.';
    if (!formData.mobile.trim()) {
      errs.mobile = 'Enter a valid mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Enter a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.pinCode.trim()) {
      errs.pinCode = 'PIN code is required.';
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      errs.pinCode = 'PIN code must be 6 digits.';
    }
    if (!formData.nomineeName.trim()) errs.nomineeName = 'Nominee name is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDocumentMockUpload = (field: keyof typeof documents, fileName: string) => {
    setDocuments(prev => ({ ...prev, [field]: fileName }));
    addToast({
      type: 'info',
      title: 'Document Attached',
      message: `${fileName} attached successfully.`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast({
        type: 'warning',
        title: 'Validation Error',
        message: 'Please resolve all required fields highlighted in red.'
      });
      return;
    }

    setSubmitting(true);
    try {
      const created = await memberService.create({
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dob: formData.dob,
        gender: formData.gender,
        mobile: `+91 ${formData.mobile.replace(/\D/g, '')}`,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        occupation: formData.occupation,
        nomineeName: formData.nomineeName,
        nomineeRelation: formData.nomineeRelation,
        branch: formData.branch,
        kycStatus: 'Pending',
        accountStatus: 'Active'
      });

      addToast({
        type: 'success',
        title: 'Member Registered',
        message: `Member ${created.fullName} (${created.id}) created successfully!`
      });

      navigate(`/members/${created.id}`);
    } catch {
      addToast({
        type: 'error',
        message: 'Unable to save member details. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Member"
        subtitle="Register a new co-operative banking member and initiate KYC onboarding."
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'Members', url: '/members' },
          { label: 'Add Member' }
        ]}
        actions={
          <button
            type="button"
            onClick={() => navigate('/members')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-700/60">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Personal Information
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary identity and contact credentials of the applicant
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => {
                  setFormData({ ...formData, firstName: e.target.value });
                  if (errors.firstName) setErrors({ ...errors, firstName: '' });
                }}
                placeholder="e.g. Rahul"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Middle Name (Optional)
              </label>
              <input
                type="text"
                value={formData.middleName}
                onChange={e => setFormData({ ...formData, middleName: e.target.value })}
                placeholder="e.g. Kumar"
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => {
                  setFormData({ ...formData, lastName: e.target.value });
                  if (errors.lastName) setErrors({ ...errors, lastName: '' });
                }}
                placeholder="e.g. Mohanty"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={e => {
                  setFormData({ ...formData, dob: e.target.value });
                  if (errors.dob) setErrors({ ...errors, dob: '' });
                }}
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.dob
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.dob && <p className="text-[11px] text-rose-500 mt-1">{errors.dob}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={e => {
                  setFormData({ ...formData, mobile: e.target.value });
                  if (errors.mobile) setErrors({ ...errors, mobile: '' });
                }}
                placeholder="e.g. 9876543210"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.mobile
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.mobile && <p className="text-[11px] text-rose-500 mt-1">{errors.mobile}</p>}
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. rahul.mohanty@gmail.com"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Address */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-700/60">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Residential Address
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Permanent communication and residence verification address
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Street Address / House No. <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => {
                  setFormData({ ...formData, address: e.target.value });
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                placeholder="Plot No. 12, Sector 5, Sahid Nagar"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.address
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                State <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                PIN Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.pinCode}
                onChange={e => {
                  setFormData({ ...formData, pinCode: e.target.value });
                  if (errors.pinCode) setErrors({ ...errors, pinCode: '' });
                }}
                placeholder="e.g. 751007"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.pinCode
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.pinCode && <p className="text-[11px] text-rose-500 mt-1">{errors.pinCode}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Additional & Nominee */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-700/60">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Additional & Nominee Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Institutional branch allocation and legal nominee registration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Occupation
              </label>
              <select
                value={formData.occupation}
                onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Government Employee">Government Employee</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Small Business Owner">Small Business Owner</option>
                <option value="Teacher">Teacher / Academician</option>
                <option value="Agricultural Farmer">Agricultural Farmer</option>
                <option value="Chartered Accountant">Chartered Accountant</option>
                <option value="Healthcare Worker">Healthcare Worker</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Branch Allocation <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bhubaneswar Main Branch">Bhubaneswar Main Branch</option>
                <option value="Cuttack Link Road Branch">Cuttack Link Road Branch</option>
                <option value="Puri Grand Road Branch">Puri Grand Road Branch</option>
                <option value="Rourkela Civil Township Branch">Rourkela Civil Township Branch</option>
                <option value="Sambalpur VSS Marg Branch">Sambalpur VSS Marg Branch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nominee Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nomineeName}
                onChange={e => {
                  setFormData({ ...formData, nomineeName: e.target.value });
                  if (errors.nomineeName) setErrors({ ...errors, nomineeName: '' });
                }}
                placeholder="e.g. Sunita Mohanty"
                className={`w-full text-xs sm:text-sm rounded-xl border px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.nomineeName
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.nomineeName && <p className="text-[11px] text-rose-500 mt-1">{errors.nomineeName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nominee Relationship
              </label>
              <select
                value={formData.nomineeRelation}
                onChange={e => setFormData({ ...formData, nomineeRelation: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Document Upload Attachments */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-700/60">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                KYC Verification Documents
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload mandatory KYC proofs for initial document verification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Photograph */}
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Passport Photo</p>
              <p className="text-[10px] text-slate-400 mb-3">JPG, PNG up to 2MB</p>
              {documents.photo ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDocumentMockUpload('photo', 'member_photo.jpg')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Upload
                </button>
              )}
            </div>

            {/* Signature */}
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Specimen Signature</p>
              <p className="text-[10px] text-slate-400 mb-3">White background</p>
              {documents.signature ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDocumentMockUpload('signature', 'specimen_sign.jpg')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Upload
                </button>
              )}
            </div>

            {/* Identity Proof */}
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Identity Proof</p>
              <p className="text-[10px] text-slate-400 mb-3">Aadhaar or PAN Card</p>
              {documents.idProof ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDocumentMockUpload('idProof', 'aadhaar_scan.pdf')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Upload
                </button>
              )}
            </div>

            {/* Address Proof */}
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
              <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Address Proof</p>
              <p className="text-[10px] text-slate-400 mb-3">Electricity bill / Passport</p>
              {documents.addressProof ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDocumentMockUpload('addressProof', 'electricity_bill.pdf')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/members')}
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 disabled:opacity-50 transition-colors"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Member</span>
          </button>
        </div>
      </form>
    </div>
  );
};
