import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Smartphone, Chrome, Apple, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from './card';

interface CompatibilityCheck {
  name: string;
  status: 'supported' | 'not-supported' | 'partial' | 'checking';
  message: string;
  icon: any;
}

export function DeviceCompatibilityChecker() {
  const [checks, setChecks] = useState<CompatibilityCheck[]>([
    { name: 'Cihaz Türü', status: 'checking', message: 'Kontrol ediliyor...', icon: Smartphone },
    { name: 'Tarayıcı Desteği', status: 'checking', message: 'Kontrol ediliyor...', icon: Chrome },
    { name: 'AR Desteği', status: 'checking', message: 'Kontrol ediliyor...', icon: Apple },
    { name: 'WebXR API', status: 'checking', message: 'Kontrol ediliyor...', icon: Wifi }
  ]);

  useEffect(() => {
    const performChecks = async () => {
      const newChecks: CompatibilityCheck[] = [...checks];

      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isMobile = isIOS || isAndroid;

      newChecks[0] = {
        name: 'Cihaz Türü',
        status: isMobile ? 'supported' : 'partial',
        message: isMobile
          ? isIOS
            ? '✅ iOS Cihaz Algılandı'
            : '✅ Android Cihaz Algılandı'
          : '⚠️ Masaüstü - AR için mobil cihaz önerilir',
        icon: Smartphone
      };

      const isChrome = /chrome|crios/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !isChrome;
      const isCompatibleBrowser = (isIOS && isSafari) || (isAndroid && isChrome);

      newChecks[1] = {
        name: 'Tarayıcı Desteği',
        status: isCompatibleBrowser ? 'supported' : 'partial',
        message: isCompatibleBrowser
          ? '✅ Uyumlu tarayıcı'
          : '⚠️ AR için ' + (isIOS ? 'Safari' : 'Chrome') + ' önerilir',
        icon: Chrome
      };

      let arSupported = false;
      if (isIOS) {
        const iosVersion = parseFloat(
          ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(userAgent) || [0,''])[1])
            .replace('undefined', '3_2').replace('_', '.').replace('_', '')
        ) || 0;
        arSupported = iosVersion >= 12;
      } else if (isAndroid) {
        arSupported = 'xr' in navigator || 'getVRDisplays' in navigator;
      }

      newChecks[2] = {
        name: 'AR Desteği',
        status: arSupported ? 'supported' : 'not-supported',
        message: arSupported
          ? '✅ AR destekleniyor'
          : '❌ AR desteklenmiyor - iOS 12+ veya ARCore gerekli',
        icon: Apple
      };

      const webXRSupported = 'xr' in navigator;

      newChecks[3] = {
        name: 'WebXR API',
        status: webXRSupported ? 'supported' : 'partial',
        message: webXRSupported
          ? '✅ WebXR destekleniyor'
          : '⚠️ Model Viewer fallback kullanılacak',
        icon: Wifi
      };

      setChecks(newChecks);
    };

    setTimeout(performChecks, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'supported':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'partial':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'not-supported':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'supported':
        return 'from-green-500/10 to-green-600/10 border-green-500/20';
      case 'partial':
        return 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/20';
      case 'not-supported':
        return 'from-red-500/10 to-red-600/10 border-red-500/20';
      default:
        return 'from-slate-500/10 to-slate-600/10 border-slate-500/20';
    }
  };

  const overallStatus = checks.every(c => c.status === 'supported')
    ? 'fully-compatible'
    : checks.some(c => c.status === 'not-supported')
    ? 'not-compatible'
    : 'partially-compatible';

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Cihaz Uyumluluk Kontrolü
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Cihazınızın AR özelliklerini destekleyip desteklemediğini kontrol edin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`p-8 mb-8 bg-gradient-to-br ${
            overallStatus === 'fully-compatible'
              ? 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 border-green-500/20'
              : overallStatus === 'not-compatible'
              ? 'from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 border-red-500/20'
              : 'from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-500/20'
          } border-2`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                overallStatus === 'fully-compatible'
                  ? 'bg-green-500'
                  : overallStatus === 'not-compatible'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}>
                {overallStatus === 'fully-compatible' ? (
                  <CheckCircle2 className="w-8 h-8 text-white" />
                ) : overallStatus === 'not-compatible' ? (
                  <XCircle className="w-8 h-8 text-white" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {overallStatus === 'fully-compatible'
                    ? 'Cihazınız Tam Uyumlu! 🎉'
                    : overallStatus === 'not-compatible'
                    ? 'Cihazınız AR Desteklemiyor'
                    : 'Kısmi Uyumluluk'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {overallStatus === 'fully-compatible'
                    ? 'Tüm AR özelliklerini kullanabilirsiniz'
                    : overallStatus === 'not-compatible'
                    ? 'AR deneyimi için uyumlu bir cihaz gerekiyor'
                    : 'Bazı özellikler sınırlı olabilir'}
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {checks.map((check, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${getStatusColor(check.status)} border`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <check.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {check.name}
                        </h4>
                        {getStatusIcon(check.status)}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {check.message}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Önerilen Gereksinimler
            </h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>iOS:</strong> iPhone 6s veya üzeri, iOS 12+, Safari tarayıcısı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span><strong>Android:</strong> ARCore destekli cihaz, Android 7.0+, Chrome tarayıcısı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span>Cihaz kamerasına erişim izni</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span>İyi aydınlatma ve düz yüzey</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
