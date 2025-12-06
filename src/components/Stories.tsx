import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isNew: boolean;
  gradient: string;
}

const stories: Story[] = [
  { id: '1', username: 'Мария', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', hasStory: true, isNew: true, gradient: 'from-pink-500 via-rose-500 to-orange-500' },
  { id: '2', username: 'Алексей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', hasStory: true, isNew: true, gradient: 'from-purple-500 via-pink-500 to-red-500' },
  { id: '3', username: 'Виктория', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vika', hasStory: true, isNew: false, gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
  { id: '4', username: 'Денис', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Denis', hasStory: true, isNew: true, gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
  { id: '5', username: 'Ольга', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', hasStory: true, isNew: false, gradient: 'from-green-500 via-emerald-500 to-teal-500' },
  { id: '6', username: 'Сергей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey', hasStory: true, isNew: true, gradient: 'from-orange-500 via-amber-500 to-yellow-500' },
  { id: '7', username: 'Анна', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna2', hasStory: true, isNew: false, gradient: 'from-red-500 via-pink-500 to-rose-500' },
];

export default function Stories() {
  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-4 hover:shadow-xl transition-all duration-300 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Истории
        </h2>
        <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-muted">
          Все истории
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        <button className="flex-shrink-0 group">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 group-hover:border-primary transition-all duration-300 group-hover:scale-105">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="Plus" size={18} className="text-white" />
              </div>
            </div>
          </div>
          <p className="text-xs font-medium text-center mt-2 text-muted-foreground group-hover:text-primary transition-colors">
            Добавить
          </p>
        </button>

        {stories.map((story, index) => (
          <button 
            key={story.id} 
            className="flex-shrink-0 group relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <div className={`p-0.5 rounded-2xl bg-gradient-to-br ${story.gradient} ${story.isNew ? 'animate-pulse-soft' : ''} group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                <Avatar className="w-16 h-16 border-4 border-card">
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-muted to-muted-foreground text-white">
                    {story.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              {story.isNew && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-center mt-2 text-foreground group-hover:text-primary transition-colors truncate w-16">
              {story.username}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
