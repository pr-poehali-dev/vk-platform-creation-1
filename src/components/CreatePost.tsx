import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CreatePostProps {
  onCreatePost: (content: string) => void;
}

const mediaOptions = [
  { id: 'photo', icon: 'Image', label: 'Фото', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'video', icon: 'Video', label: 'Видео', gradient: 'from-purple-500 to-pink-500' },
  { id: 'music', icon: 'Music', label: 'Музыка', gradient: 'from-green-500 to-emerald-500' },
  { id: 'poll', icon: 'BarChart3', label: 'Опрос', gradient: 'from-orange-500 to-amber-500' },
  { id: 'location', icon: 'MapPin', label: 'Место', gradient: 'from-red-500 to-rose-500' },
];

export default function CreatePost({ onCreatePost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-5 hover:shadow-xl hover:border-border transition-all duration-300 animate-fade-up">
      <div className="flex gap-3">
        <Avatar className="w-11 h-11 ring-2 ring-primary/20 hover:ring-primary/40 transition-all flex-shrink-0">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">ИИ</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <div className="relative">
            <Textarea
              placeholder="Что у вас нового?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyPress}
              className="min-h-[60px] resize-none border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl placeholder:text-muted-foreground transition-all"
            />
            {content && (
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-lg">
                {content.length} / 5000
              </div>
            )}
          </div>
          
          {isExpanded && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {mediaOptions.map((option, index) => (
                  <button
                    key={option.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105 bg-gradient-to-r ${option.gradient} text-white shadow-md hover:shadow-lg`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon name={option.icon} size={16} />
                    <span className="text-xs font-medium hidden sm:inline">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    <Icon name="Smile" size={18} />
                    <span className="text-xs hidden sm:inline">Эмодзи</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    <Icon name="AtSign" size={18} />
                    <span className="text-xs hidden sm:inline">Отметить</span>
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
                    className="rounded-xl"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 rounded-xl animate-gradient"
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    Опубликовать
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
