import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'friends', label: 'Друзья', icon: 'Users', badge: 3 },
  { id: 'messages', label: 'Сообщения', icon: 'MessageCircle', badge: 5 },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell', badge: 12 },
  { id: 'groups', label: 'Группы', icon: 'UsersRound' },
  { id: 'search', label: 'Поиск', icon: 'Search' },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">В</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ВКонтакте
          </h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              hover:bg-muted group relative
              ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Icon 
              name={item.icon} 
              size={22} 
              className={activeTab === item.id ? 'text-primary' : 'group-hover:text-foreground'}
            />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="ml-auto bg-accent hover:bg-accent min-w-[24px] h-6 rounded-full"
              >
                {item.badge}
              </Badge>
            )}
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full animate-scale-in" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all cursor-pointer group">
          <Avatar className="w-10 h-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">ИИ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">Иван Иванов</p>
            <p className="text-xs text-muted-foreground truncate">Онлайн</p>
          </div>
          <Icon name="Settings" size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </aside>
  );
}
