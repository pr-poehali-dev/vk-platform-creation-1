import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

const reactions = [
  { id: 'like', icon: 'Heart', label: 'Нравится', gradient: 'from-pink-500 to-rose-500' },
  { id: 'love', icon: 'Heart', label: 'Обожаю', gradient: 'from-red-500 to-pink-500' },
  { id: 'haha', icon: 'Laugh', label: 'Ха-ха', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'wow', icon: 'Zap', label: 'Вау', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'sad', icon: 'Frown', label: 'Грустно', gradient: 'from-gray-500 to-slate-500' },
];

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    if (!isLiked) {
      setSelectedReaction('like');
    } else {
      setSelectedReaction(null);
    }
  };

  const handleReaction = (reactionId: string) => {
    if (selectedReaction === reactionId) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      setSelectedReaction(null);
    } else {
      if (!isLiked) {
        setLikesCount(likesCount + 1);
      }
      setIsLiked(true);
      setSelectedReaction(reactionId);
    }
    setShowReactions(false);
  };

  return (
    <article className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 hover:shadow-2xl hover:border-border transition-all duration-300 animate-fade-up overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <div className="relative group">
              <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {post.author.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card animate-pulse-soft shadow-lg" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {post.author.name}
              </h3>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted rounded-full">
            <Icon name="MoreHorizontal" size={20} className="text-muted-foreground" />
          </Button>
        </div>

        <p className="text-foreground mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>

        {post.image && (
          <div className="mb-4 -mx-5 overflow-hidden rounded-xl">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>
        )}

        <div className="flex items-center justify-between py-3 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                  <Icon name="Heart" size={12} className="text-white" />
                </div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                  <Icon name="Laugh" size={12} className="text-white" />
                </div>
              </div>
              <span className="font-medium">{likesCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
              <Icon name="MessageCircle" size={16} />
              <span>{post.comments}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
            <Icon name="Share2" size={16} />
            <span>{post.shares} поделились</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <div className="relative flex-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`w-full gap-2 rounded-xl transition-all duration-200 ${
                isLiked 
                  ? 'text-accent hover:text-accent bg-accent/10' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              onClick={handleLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <Icon 
                name="Heart" 
                size={18} 
                className={isLiked ? 'fill-current animate-scale-in' : ''} 
              />
              <span className="font-medium">
                {selectedReaction ? reactions.find(r => r.id === selectedReaction)?.label : 'Нравится'}
              </span>
            </Button>
            
            {showReactions && (
              <div 
                className="absolute bottom-full left-0 mb-2 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-2 flex gap-1 animate-scale-in z-10"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction) => (
                  <button
                    key={reaction.id}
                    onClick={() => handleReaction(reaction.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-125 bg-gradient-to-br ${reaction.gradient}`}
                    title={reaction.label}
                  >
                    <Icon name={reaction.icon} size={20} className="text-white" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 gap-2 text-muted-foreground hover:bg-muted rounded-xl"
            onClick={() => setShowComments(!showComments)}
          >
            <Icon name="MessageCircle" size={18} />
            <span className="font-medium">Комментарии</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 gap-2 text-muted-foreground hover:bg-muted rounded-xl"
          >
            <Icon name="Share2" size={18} />
            <span className="font-medium">Поделиться</span>
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in space-y-3">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">ИИ</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Написать комментарий..." 
                  className="w-full px-4 py-2.5 bg-muted/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-background transition-colors">
                  <Icon name="Send" size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
