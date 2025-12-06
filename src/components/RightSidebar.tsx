import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  status?: string;
}

const onlineFriends: Friend[] = [
  { id: '1', name: 'Анна Кузнецова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', isOnline: true, status: 'Работаю над проектом 💻' },
  { id: '2', name: 'Максим Петров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', isOnline: true, status: 'Слушаю музыку 🎵' },
  { id: '3', name: 'Елена Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', isOnline: true, status: 'В отпуске ☀️' },
  { id: '4', name: 'Дмитрий Волков', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', isOnline: true, status: 'Занимаюсь спортом 🏃' },
  { id: '5', name: 'Ольга Новикова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', isOnline: true, status: 'Читаю книгу 📚' },
  { id: '6', name: 'Алексей Соколов', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey', isOnline: true, status: 'Играю в игры 🎮' },
];

const suggestions = [
  { id: '1', name: 'Концерты в Москве', members: '24.5K', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=concerts', gradient: 'from-pink-500 to-rose-500' },
  { id: '2', name: 'Веб-разработка', members: '156K', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=webdev', gradient: 'from-blue-500 to-cyan-500' },
  { id: '3', name: 'Путешествия 2025', members: '89.2K', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=travel', gradient: 'from-green-500 to-emerald-500' },
];

export default function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const filteredFriends = onlineFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-card/80 backdrop-blur-xl border-l border-border/50 flex flex-col animate-fade-in shadow-xl">
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск друзей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-border/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
              Друзья онлайн
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full">
              {filteredFriends.length}
            </Badge>
          </div>
          
          <div className="space-y-1">
            {filteredFriends.map((friend, index) => (
              <button
                key={friend.id}
                onClick={() => setActiveChat(activeChat === friend.id ? null : friend.id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group ${
                  activeChat === friend.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                }`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse-soft" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {friend.name}
                  </p>
                  {friend.status && (
                    <p className="text-xs text-muted-foreground truncate">{friend.status}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-background transition-colors">
                    <Icon 
                      name="MessageCircle" 
                      size={16} 
                      className="text-muted-foreground group-hover:text-primary transition-colors" 
                    />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-background transition-colors">
                    <Icon 
                      name="Phone" 
                      size={16} 
                      className="text-muted-foreground group-hover:text-green-500 transition-colors" 
                    />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Рекомендации</h3>
            <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-muted rounded-lg">
              Все
            </Button>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((group, index) => (
              <div 
                key={group.id} 
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br ${group.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md`}>
                  <img src={group.image} alt={group.name} className="w-8 h-8 opacity-80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.members} участников</p>
                </div>
                <Button size="sm" variant="ghost" className="shrink-0 h-8 w-8 p-0 rounded-lg hover:bg-primary hover:text-white transition-all">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-[1px] overflow-hidden shadow-xl">
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 animate-float">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Premium подписка
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Безлимитные истории, уникальные стикеры и приоритетная поддержка
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg rounded-xl animate-gradient"
                >
                  <Icon name="Zap" size={14} className="mr-2" />
                  Попробовать бесплатно
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
