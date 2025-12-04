import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Story {
  id: string;
  name: string;
  avatar: string;
  hasNew: boolean;
}

const stories: Story[] = [
  { id: '1', name: 'Ваша история', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user', hasNew: false },
  { id: '2', name: 'Анна К.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', hasNew: true },
  { id: '3', name: 'Максим П.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', hasNew: true },
  { id: '4', name: 'Елена С.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', hasNew: true },
  { id: '5', name: 'Дмитрий В.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', hasNew: false },
  { id: '6', name: 'Ольга Н.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', hasNew: true },
  { id: '7', name: 'Сергей Л.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey', hasNew: false },
];

export default function Stories() {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 animate-fade-in">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 min-w-[80px] group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              {story.id === '1' ? (
                <div className="relative">
                  <Avatar className="w-16 h-16 ring-2 ring-border">
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-card">
                    <Icon name="Plus" size={14} className="text-white" />
                  </div>
                </div>
              ) : (
                <Avatar 
                  className={`w-16 h-16 ring-3 transition-transform group-hover:scale-105 ${
                    story.hasNew 
                      ? 'ring-2 ring-gradient-to-r from-primary via-accent to-secondary' 
                      : 'ring-2 ring-border'
                  }`}
                  style={{
                    background: story.hasNew 
                      ? 'linear-gradient(135deg, #0EA5E9 0%, #D946EF 50%, #8B5CF6 100%)' 
                      : undefined,
                    padding: story.hasNew ? '2px' : undefined,
                  }}
                >
                  <AvatarImage src={story.avatar} className={story.hasNew ? 'rounded-full ring-2 ring-card' : ''} />
                  <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 w-full">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
