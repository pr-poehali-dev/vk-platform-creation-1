import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  gradient?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: 'Home', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'profile', label: 'Профиль', icon: 'User', gradient: 'from-purple-500 to-pink-500' },
  { id: 'news', label: 'Новости', icon: 'Newspaper', gradient: 'from-orange-500 to-red-500' },
  { id: 'friends', label: 'Друзья', icon: 'Users', badge: 3, gradient: 'from-green-500 to-emerald-500' },
  { id: 'messages', label: 'Сообщения', icon: 'MessageCircle', badge: 5, gradient: 'from-blue-500 to-indigo-500' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell', badge: 12, gradient: 'from-pink-500 to-rose-500' },
  { id: 'groups', label: 'Группы', icon: 'UsersRound', gradient: 'from-violet-500 to-purple-500' },
  { id: 'music', label: 'Музыка', icon: 'Music', gradient: 'from-cyan-500 to-blue-500' },
  { id: 'videos', label: 'Видео', icon: 'Video', gradient: 'from-red-500 to-pink-500' },
  { id: 'search', label: 'Поиск', icon: 'Search', gradient: 'from-amber-500 to-orange-500' },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-300 animate-fade-in shadow-xl ${
        isMinimized ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between gap-3">
          {!isMinimized && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-gradient shadow-lg">
                <span className="text-white font-bold text-xl">В</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ВКонтакте
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <Icon name={isMinimized ? 'ChevronRight' : 'ChevronLeft'} size={18} />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              hover:bg-gradient-to-r ${item.gradient} hover:text-white group relative overflow-hidden
              ${activeTab === item.id ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` : 'text-muted-foreground'}
            `}
            style={{ animationDelay: `${index * 30}ms` }}
            title={isMinimized ? item.label : ''}
          >
            <div className={`${activeTab === item.id ? 'animate-float' : ''}`}>
              <Icon 
                name={item.icon} 
                size={20} 
                className={activeTab === item.id ? 'text-white' : 'group-hover:text-white'}
              />
            </div>
            {!isMinimized && (
              <>
                <span className="font-medium text-sm truncate">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto bg-white/90 text-foreground hover:bg-white min-w-[22px] h-5 text-xs rounded-full shadow-md"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-scale-in shadow-lg" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-all cursor-pointer group">
          <Avatar className="w-10 h-10 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">ИИ</AvatarFallback>
          </Avatar>
          {!isMinimized && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">Иван Иванов</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                  <p className="text-xs text-muted-foreground truncate">Онлайн</p>
                </div>
              </div>
              <Icon name="Settings" size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
