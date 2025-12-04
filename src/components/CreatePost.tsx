import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CreatePostProps {
  onCreatePost: (content: string) => void;
}

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

  return (
    <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-lg transition-all duration-200 animate-slide-up">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">ИИ</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="Что нового?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="min-h-[60px] resize-none border-0 bg-muted focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
          />
          
          {isExpanded && (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                  <Icon name="Image" size={18} />
                  <span className="hidden sm:inline">Фото</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-secondary">
                  <Icon name="Video" size={18} />
                  <span className="hidden sm:inline">Видео</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-accent">
                  <Icon name="Smile" size={18} />
                  <span className="hidden sm:inline">Эмодзи</span>
                </Button>
              </div>
              
              <Button 
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Опубликовать
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
