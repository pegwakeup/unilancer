import { Link } from 'react-router-dom';

const members = [
  {
    name: 'Mehmet Yılmaz',
    role: 'Kurucu - CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=460&h=460&fit=crop',
    link: '#',
  },
  {
    name: 'Ayşe Demir',
    role: 'Kurucu Ortak - CTO',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=460&h=460&fit=crop',
    link: '#',
  },
  {
    name: 'Ahmet Kaya',
    role: 'Satış Müdürü',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=460&h=460&fit=crop',
    link: '#',
  },
  {
    name: 'Zeynep Arslan',
    role: 'UX Mühendisi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=460&h=460&fit=crop',
    link: '#',
  },
  {
    name: 'Can Öztürk',
    role: 'Etkileşim Tasarımcısı',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=460&h=460&fit=crop',
    link: '#',
  },
  {
    name: 'Elif Şahin',
    role: 'Görsel Tasarımcı',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=460&h=460&fit=crop',
    link: '#',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-slate-50/50 dark:bg-transparent py-16 md:py-32">
      <div className="mx-auto max-w-5xl border-t border-slate-200 dark:border-slate-800 px-6">
        <span className="text-sm text-slate-600 dark:text-slate-400 -ml-6 -mt-3.5 block w-max bg-slate-50 dark:bg-dark px-6">
          Ekip
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Hayallerimizi Gerçekleştiren Ekibimiz
            </h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-slate-600 dark:text-gray-300">
              Çalışma sürecinde, müşteri ile düzenli uyum toplantıları yapıyoruz çünkü yeni bir takım elbise giydiğinde uyup uymadığını hissedebilecek tek kişi odur.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <img
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={member.avatar}
                  alt={member.name}
                  width="826"
                  height="1239"
                  loading="lazy"
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-slate-900 dark:text-white text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      _0{index + 1}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-slate-600 dark:text-gray-300 inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {member.role}
                    </span>
                    <Link
                      to={member.link}
                      className="text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-light inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Profil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
