import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Phone, Building2, User, FileText,
  Calendar, Wallet, Clock, Code2, Palette, LineChart,
  ExternalLink, CheckCircle, XCircle, AlertCircle,
  Globe, Smartphone, Database, BrainCircuit, PaintBucket,
  FileImage, Figma, Monitor, Search, Target, BarChart2,
  Info, MessageSquare, ArrowRight
} from 'lucide-react';
import type { ProjectRequest } from '../types';

interface ProjectRequestDetailModalProps {
  request: ProjectRequest;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: ProjectRequest['status']) => void;
}

const ProjectRequestDetailModal = ({ request, onClose, onUpdateStatus }: ProjectRequestDetailModalProps) => {
  const getStatusColor = (status: ProjectRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'reviewing':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: ProjectRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'Bekliyor';
      case 'reviewing':
        return 'İnceleniyor';
      case 'in-progress':
        return 'Devam Ediyor';
      case 'completed':
        return 'Tamamlandı';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: ProjectRequest['status']) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'reviewing':
        return AlertCircle;
      case 'in-progress':
        return Clock;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getServiceDetails = (category: string) => {
    switch (category) {
      case 'software':
        return {
          icon: Code2,
          label: 'Yazılım',
          subCategories: [
            { icon: Globe, label: 'Web Geliştirme' },
            { icon: Smartphone, label: 'Mobil Uygulama' },
            { icon: Database, label: 'SaaS Çözümleri' },
            { icon: BrainCircuit, label: 'AI Entegrasyonları' }
          ]
        };
      case 'design':
        return {
          icon: Palette,
          label: 'Tasarım',
          subCategories: [
            { icon: Monitor, label: 'Dijital & Web Tasarım' },
            { icon: PaintBucket, label: 'Kurumsal Kimlik & Marka' },
            { icon: FileImage, label: 'Basılı & Grafik Tasarım' },
            { icon: Figma, label: 'İllüstrasyon & 3D' }
          ]
        };
      case 'digital-strategy':
        return {
          icon: LineChart,
          label: 'Dijital Strateji',
          subCategories: [
            { icon: Search, label: 'SEO & SEM' },
            { icon: Target, label: 'Dijital Reklam' },
            { icon: BarChart2, label: 'Analitik' }
          ]
        };
      default:
        return {
          icon: Code2,
          label: category,
          subCategories: []
        };
    }
  };

  const StatusIcon = getStatusIcon(request.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-dark-light rounded-xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-dark-light/95 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">{request.company_name}</h2>
              <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(request.status)}`}>
                <div className="flex items-center space-x-1.5">
                  <StatusIcon className="w-4 h-4" />
                  <span>{getStatusText(request.status)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)] space-y-8">
            {/* Quick Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-dark p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Firma</div>
                    <div className="font-medium">{request.company_name}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Talep Tarihi</div>
                    <div className="font-medium">{new Date(request.created_at).toLocaleDateString('tr-TR')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Durum</div>
                    <div className="font-medium">{getStatusText(request.status)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-dark p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">İletişim Kişisi</div>
                      <div>{request.contact_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">E-posta</div>
                      <div>{request.email}</div>
                    </div>
                  </div>
                </div>
                {request.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Telefon</div>
                      <div>{request.phone}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Categories */}
            <div className="bg-dark p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Talep Edilen Hizmetler</h3>
              <div className="grid gap-6">
                {request.service_categories.map((category, index) => {
                  const service = getServiceDetails(category);
                  const Icon = service.icon;
                  return (
                    <div key={index} className="bg-dark-light/50 p-4 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="text-lg font-medium">{service.label}</h4>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.subCategories.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center space-x-2 p-3 bg-dark rounded-lg border border-white/10"
                          >
                            <sub.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{sub.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-dark p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Proje Detayları</h3>
              
              {/* Project Description */}
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Proje Açıklaması</div>
                <div className="bg-dark-light/50 p-4 rounded-lg border border-white/10">
                  <p className="whitespace-pre-wrap">{request.project_description}</p>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                {request.budget_range && (
                  <div className="bg-dark-light/50 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Bütçe Aralığı</div>
                        <div className="font-medium">{request.budget_range}</div>
                      </div>
                    </div>
                  </div>
                )}

                {request.timeline && (
                  <div className="bg-dark-light/50 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">İstenen Teslim Süresi</div>
                        <div className="font-medium">{request.timeline}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Brief Document */}
            {request.brief_url && (
              <div className="bg-dark p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Proje Brief'i</h3>
                <a
                  href={request.brief_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-dark-light/50 rounded-lg border border-white/10 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Brief Belgesi</div>
                      <div className="text-sm text-gray-400">Detaylı proje gereksinimleri</div>
                    </div>
                  </div>
                  <div className="flex items-center text-primary space-x-2">
                    <span className="text-sm">Görüntüle</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            )}

            {/* Status History */}
            <div className="bg-dark p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Durum Geçmişi</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Mevcut Durum</div>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm mt-1 ${getStatusColor(request.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{getStatusText(request.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {onUpdateStatus && request.status === 'pending' && (
            <div className="p-6 border-t border-white/10 bg-dark-light/95 backdrop-blur-sm">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    onUpdateStatus(request.id, 'reviewing');
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>İncelemeye Al</span>
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(request.id, 'cancelled');
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  <span>İptal Et</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Kapat</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectRequestDetailModal;