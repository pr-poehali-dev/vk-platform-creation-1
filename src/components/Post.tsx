import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <article className="bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-200 animate-slide-up">
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {post.author.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {post.author.name}
              </h3>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Icon name="MoreHorizontal" size={20} className="text-muted-foreground" />
          </Button>
        </div>

        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {post.image && (
          <div className="mb-4 -mx-4 overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        )}

        <div className="flex items-center gap-4 py-3 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Heart" size={16} className="text-accent" />
            <span>{likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={16} />
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Share2" size={16} />
            <span>{post.shares}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex-1 gap-2 ${isLiked ? 'text-accent hover:text-accent' : 'text-muted-foreground'}`}
            onClick={handleLike}
          >
            <Icon name={isLiked ? 'Heart' : 'Heart'} size={18} className={isLiked ? 'fill-current' : ''} />
            <span className="font-medium">Нравится</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 gap-2 text-muted-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            <Icon name="MessageCircle" size={18} />
            <span className="font-medium">Комментарии</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground">
            <Icon name="Share2" size={18} />
            <span className="font-medium">Поделиться</span>
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <div className="flex gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
              <input 
                type="text" 
                placeholder="Написать комментарий..." 
                className="flex-1 px-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
