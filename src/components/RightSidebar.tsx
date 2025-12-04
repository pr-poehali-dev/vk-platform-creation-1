import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

const onlineFriends: Friend[] = [
  { id: '1', name: 'Анна Кузнецова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', isOnline: true },
  { id: '2', name: 'Максим Петров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', isOnline: true },
  { id: '3', name: 'Елена Смирнова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', isOnline: true },
  { id: '4', name: 'Дмитрий Волков', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', isOnline: true },
  { id: '5', name: 'Ольга Новикова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', isOnline: true },
];

const suggestions = [
  { id: '1', name: 'Концерты в Москве', members: '24.5K', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=concerts' },
  { id: '2', name: 'Веб-разработка', members: '156K', image: 'https://api.dicebear.com/7.x/shapes/svg?seed=webdev' },
];

export default function RightSidebar() {
  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-background border-l border-border p-4 space-y-4 overflow-y-auto animate-fade-in">
      <div className="bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Друзья онлайн</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {onlineFriends.length}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {onlineFriends.map((friend, index) => (
            <button
              key={friend.id}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-all group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {friend.name}
                </p>
                <p className="text-xs text-muted-foreground">В сети</p>
              </div>
              <Icon 
                name="MessageCircle" 
                size={18} 
                className="text-muted-foreground group-hover:text-primary transition-colors" 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="font-semibold text-foreground mb-4">Рекомендуемые группы</h3>
        
        <div className="space-y-3">
          {suggestions.map((group) => (
            <div key={group.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{group.name}</p>
                <p className="text-xs text-muted-foreground">{group.members} участников</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <Icon name="Sparkles" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Премиум подписка</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Больше возможностей для общения и развлечений
            </p>
            <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Попробовать
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
