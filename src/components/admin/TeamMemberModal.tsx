import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Sparkles, 
  Award, 
  Globe, 
  UserCheck,
  Upload,
  CheckCircle2,
  FileImage,
  Loader2
} from 'lucide-react';
import { TeamMember } from '../../types';
import { optimizeImageFile } from '../../utils/imageUpload';

interface TeamMemberModalProps {
  isOpen: boolean;
  member: TeamMember | null; // null means Add New
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}

const GUIDE_IMAGE_PRESETS = [
  {
    name: 'Senior Guide Portrait 1',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Naturalist Specialist 2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Field Expedition Leader 3',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Primate Tracker & Ranger 4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Safari Wilderness Lead 5',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wildlife Biologist Guide 6',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
];

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  member,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    role: '',
    years: '',
    specialty: '',
    region: '',
    bio: '',
    fullBio: '',
    image: GUIDE_IMAGE_PRESETS[0].url,
    notableExpeditions: '',
    languages: [],
    certifications: [],
    socials: {},
  });

  const [languagesInput, setLanguagesInput] = useState('');
  const [certificationsInput, setCertificationsInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Profile picture upload states
  const [photoSourceTab, setPhotoSourceTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [isDragOverPhoto, setIsDragOverPhoto] = useState(false);
  const [uploadedPhotoMeta, setUploadedPhotoMeta] = useState<{
    name: string;
    sizeKB: number;
    width: number;
    height: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form state when editing
  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id,
        name: member.name,
        role: member.role,
        years: member.years || '',
        specialty: member.specialty || '',
        region: member.region || '',
        bio: member.bio,
        fullBio: member.fullBio || member.bio,
        image: member.image,
        notableExpeditions: member.notableExpeditions || '',
        languages: member.languages || [],
        certifications: member.certifications || [],
        socials: member.socials || {},
      });
      setLanguagesInput((member.languages || []).join(', '));
      setCertificationsInput((member.certifications || []).join('\n'));
    } else {
      setFormData({
        id: `team-${Date.now()}`,
        name: '',
        role: 'Senior Naturalist & Safari Guide',
        years: '7 Years Guiding',
        specialty: 'Primate Tracking, Birding & Wilderness Ecology',
        region: 'Uganda & East Africa',
        bio: 'Passionate Ugandan naturalist with deep expertise in primate conservation and East African ecosystems.',
        fullBio: 'With extensive field experience across Uganda and Rwanda national parks, they specialize in leading immersive, respectful wildlife expeditions. Trained under Uganda Wildlife Authority standards with continuous field leadership.',
        image: GUIDE_IMAGE_PRESETS[0].url,
        notableExpeditions: 'Led over 250+ bespoke expeditions across Bwindi, Murchison Falls, and Queen Elizabeth National Parks.',
        languages: ['English', 'Luganda', 'Swahili'],
        certifications: ['USAGA Senior Guide', 'Wilderness First Responder'],
        socials: {},
      });
      setLanguagesInput('English, Luganda, Swahili');
      setCertificationsInput('USAGA Senior Guide\nWilderness First Responder');
    }
    setValidationError(null);

    // Determine initial photo source tab
    if (member?.image) {
      if (member.image.startsWith('data:image/')) {
        setPhotoSourceTab('upload');
        setUploadedPhotoMeta({
          name: 'Current Uploaded Photo',
          sizeKB: Math.round(member.image.length / 1024),
          width: 800,
          height: 800,
        });
      } else if (GUIDE_IMAGE_PRESETS.some((p) => p.url === member.image)) {
        setPhotoSourceTab('preset');
        setUploadedPhotoMeta(null);
      } else {
        setPhotoSourceTab('url');
        setUploadedPhotoMeta(null);
      }
    } else {
      setPhotoSourceTab('upload');
      setUploadedPhotoMeta(null);
    }
  }, [member, isOpen]);

  // Profile Photo Upload Handlers
  const handleProcessPhotoFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setValidationError('Please select a valid image file (PNG, JPG, or WebP).');
      return;
    }

    try {
      setIsProcessingPhoto(true);
      setValidationError(null);
      const result = await optimizeImageFile(file, 800, 0.82);
      setFormData((prev) => ({ ...prev, image: result.dataUrl }));
      setUploadedPhotoMeta({
        name: result.originalName,
        sizeKB: result.optimizedSizeKB,
        width: result.width,
        height: result.height,
      });
      setPhotoSourceTab('upload');
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : 'Failed to process selected profile photo.');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessPhotoFile(file);
    }
    e.target.value = '';
  };

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverPhoto(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessPhotoFile(file);
    }
  };

  if (!isOpen) return null;

  // Submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Team member name is required.');
      return;
    }
    if (!formData.role.trim()) {
      setValidationError('Role / Title is required.');
      return;
    }
    if (!formData.bio.trim()) {
      setValidationError('Short bio is required for the card display.');
      return;
    }
    if (!formData.fullBio.trim()) {
      setValidationError('Full bio narrative is required for the profile pop-up window.');
      return;
    }
    if (!formData.image.trim()) {
      setValidationError('A valid portrait photo image is required.');
      return;
    }

    const parsedLanguages = languagesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedCertifications = certificationsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanedMember: TeamMember = {
      id: formData.id || `team-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim(),
      years: (formData.years || '').trim() || '5+ Years Guiding',
      specialty: (formData.specialty || '').trim() || 'Primate Tracking & Wildlife Ecology',
      region: (formData.region || '').trim() || 'Uganda & East Africa',
      bio: formData.bio.trim(),
      fullBio: formData.fullBio.trim(),
      image: formData.image.trim(),
      languages: parsedLanguages.length > 0 ? parsedLanguages : ['English', 'Luganda', 'Swahili'],
      certifications: parsedCertifications.length > 0 ? parsedCertifications : ['USAGA Certified Guide'],
      notableExpeditions: (formData.notableExpeditions || '').trim(),
      socials: {
        facebook: formData.socials?.facebook?.trim() || '',
        x: formData.socials?.x?.trim() || '',
        instagram: formData.socials?.instagram?.trim() || '',
        linkedin: formData.socials?.linkedin?.trim() || '',
      },
    };

    onSave(cleanedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl border border-[#ded5c7] text-[#14261b] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0e2117] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#048310]/30 border border-[#048310]/50 flex items-center justify-center text-[#048310]">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {member ? `Edit Team Member: ${member.name}` : 'Add New Team Member'}
              </h2>
              <p className="text-xs text-white/60">
                Manage team member profile picture, title, and bio narrative
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {validationError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold">
              {validationError}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0e2117] flex items-center gap-2 border-b border-[#ebdcca] pb-2">
              <Sparkles className="w-4 h-4 text-[#ee5f27]" />
              <span>1. Profile, Role &amp; Territory</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Namubiru"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Naturalist & Ornithology Specialist"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Experience / Years
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9 Years Guiding"
                  value={formData.years || ''}
                  onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Primary Region / Territory
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mabamba Wetland, Semuliki & Albertine Rift"
                  value={formData.region || ''}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0e2117] mb-1">
                Guiding Specialty / Wildlife Focus
              </label>
              <input
                type="text"
                placeholder="e.g. Albertine Endemics, Shoebill Stork Tracking & Eco-Lodge Logistics"
                value={formData.specialty || ''}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section 2: Portrait Photography with Direct File Upload */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ebdcca] pb-2 gap-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0e2117] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#048310]" />
                <span>2. Profile Picture</span>
              </h3>

              {/* Source Switcher Tabs */}
              <div className="flex items-center bg-[#f0eae1] p-0.5 rounded-xl text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setPhotoSourceTab('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    photoSourceTab === 'upload'
                      ? 'bg-white text-[#048310] shadow-2xs font-bold'
                      : 'text-[#627364] hover:text-[#0e2117]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Device Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoSourceTab('preset')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    photoSourceTab === 'preset'
                      ? 'bg-white text-[#0e2117] shadow-2xs font-bold'
                      : 'text-[#627364] hover:text-[#0e2117]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ee5f27]" />
                  <span>Presets</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoSourceTab('url')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    photoSourceTab === 'url'
                      ? 'bg-white text-[#0e2117] shadow-2xs font-bold'
                      : 'text-[#627364] hover:text-[#0e2117]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web Link</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Photo Preview Card */}
              <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-md shrink-0 relative group">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Profile Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = GUIDE_IMAGE_PRESETS[0].url;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-xs text-gray-400 p-2 text-center">
                    <FileImage className="w-6 h-6 mb-1 text-gray-300" />
                    <span>No Profile Photo</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] py-0.5 text-center rounded-md font-semibold truncate px-1">
                  {formData.image.startsWith('data:image/')
                    ? 'Uploaded File'
                    : GUIDE_IMAGE_PRESETS.some((p) => p.url === formData.image)
                    ? 'Preset Portrait'
                    : 'External Image'}
                </div>

                {isProcessingPhoto && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs gap-1.5">
                    <Loader2 className="w-5 h-5 animate-spin text-[#048310]" />
                    <span>Optimizing...</span>
                  </div>
                )}
              </div>

              {/* Tab 1: Upload from Device Dropzone */}
              {photoSourceTab === 'upload' && (
                <div className="grow space-y-3 w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOverPhoto(true);
                    }}
                    onDragLeave={() => setIsDragOverPhoto(false)}
                    onDrop={handlePhotoDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                      isDragOverPhoto
                        ? 'border-[#048310] bg-[#048310]/10 scale-[1.01]'
                        : 'border-[#d3c7b6] hover:border-[#048310] bg-[#fbf9f6] hover:bg-[#f6f2eb]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#048310]/10 text-[#048310] flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#0e2117]">
                      Click to browse or drag & drop profile picture
                    </p>
                    <p className="text-[10px] text-[#627364] mt-1">
                      Supports JPG, PNG, WebP · Automatically compressed & optimized for Firestore cloud database
                    </p>
                  </div>

                  {uploadedPhotoMeta && (
                    <div className="flex items-center justify-between bg-[#edf8ee] border border-[#c1e6c3] px-3.5 py-2 rounded-xl text-xs">
                      <div className="flex items-center gap-2 text-[#048310] font-semibold truncate">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="truncate">{uploadedPhotoMeta.name}</span>
                        <span className="text-[10px] bg-[#048310]/15 px-1.5 py-0.5 rounded-md shrink-0">
                          {uploadedPhotoMeta.sizeKB} KB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] font-bold text-[#048310] hover:underline shrink-0 ml-2 cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Naturalist Presets */}
              {photoSourceTab === 'preset' && (
                <div className="grow space-y-3 w-full">
                  <div>
                    <span className="text-[11px] font-bold text-[#627364] block mb-2">
                      Select a naturalist portrait preset:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {GUIDE_IMAGE_PRESETS.map((preset, idx) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: preset.url });
                            setUploadedPhotoMeta(null);
                          }}
                          className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                            formData.image === preset.url
                              ? 'bg-[#0e2117] text-white border-[#0e2117] shadow-xs'
                              : 'bg-white hover:bg-[#faf5ee] text-[#0e2117] border-[#d7ccbc]'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                          <span className="text-[11px] font-medium truncate">
                            Preset {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Web Image URL */}
              {photoSourceTab === 'url' && (
                <div className="grow space-y-2 w-full">
                  <label className="block text-xs font-bold text-[#0e2117]">
                    Image Web Address (Direct HTTPS link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setUploadedPhotoMeta(null);
                    }}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#627364]">
                    Provide a direct link to any hosted portrait photo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Bios & Stories */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0e2117] flex items-center gap-2 border-b border-[#ebdcca] pb-2">
              <Award className="w-4 h-4 text-[#ee5f27]" />
              <span>3. Bio Narratives</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#0e2117] mb-1">
                Short Card Bio (Displayed on the card preview) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Brief 1-2 sentence overview of the team member..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0e2117] mb-1">
                Full In-Depth Bio &amp; Story (Displayed inside the selected pop-up window) *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Comprehensive background: experience, guiding approach, regional expertise, wildlife passion..."
                value={formData.fullBio}
                onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Section 4: Languages, Certifications & Expeditions */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0e2117] flex items-center gap-2 border-b border-[#ebdcca] pb-2">
              <Globe className="w-4 h-4 text-[#048310]" />
              <span>4. Languages, Qualifications &amp; Highlights</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Languages Spoken (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. English, Luganda, Swahili, French"
                  value={languagesInput}
                  onChange={(e) => setLanguagesInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e2117] mb-1">
                  Notable Expeditions / Milestones
                </label>
                <input
                  type="text"
                  placeholder="e.g. 380+ Mountain Gorilla treks guided with 100% sighting success"
                  value={formData.notableExpeditions || ''}
                  onChange={(e) => setFormData({ ...formData, notableExpeditions: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0e2117] mb-1">
                Official Certifications (one per line)
              </label>
              <textarea
                rows={3}
                placeholder="USAGA Senior Guide Level 1 & 2&#10;UWA Advanced Primate Tracking Permit&#10;Wilderness First Responder (WFR)"
                value={certificationsInput}
                onChange={(e) => setCertificationsInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d3c7b6] bg-[#fbf9f6] focus:border-[#048310] focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-[#ebdcca] flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#506153] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#048310] hover:bg-[#036a0d] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {member ? 'Save Changes' : 'Add Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
