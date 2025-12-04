import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import Stories from '@/components/Stories';
import CreatePost from '@/components/CreatePost';
import Post, { PostData } from '@/components/Post';

const initialPosts: PostData[] = [
  {
    id: '1',
    author: {
      name: 'Анна Кузнецова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      isOnline: true,
    },
    content: 'Сегодня был потрясающий день! Посетила новую выставку современного искусства 🎨 Рекомендую всем, кто ценит креатив и нестандартные подходы. Делитесь своими впечатлениями, если уже были!',
    timestamp: '2 часа назад',
    likes: 124,
    comments: 18,
    shares: 5,
  },
  {
    id: '2',
    author: {
      name: 'Максим Петров',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      isOnline: true,
    },
    content: 'Завершил разработку нового проекта! 🚀 Целый месяц упорной работы, и вот результат. Спасибо команде за поддержку и отличную атмосферу. Теперь можно немного отдохнуть 😊',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
    timestamp: '4 часа назад',
    likes: 256,
    comments: 34,
    shares: 12,
  },
  {
    id: '3',
    author: {
      name: 'Елена Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      isOnline: false,
    },
    content: 'Кто-нибудь знает хорошие курсы по веб-дизайну? Хочу прокачать свои навыки в UI/UX. Буду рада вашим рекомендациям! ✨',
    timestamp: '6 часов назад',
    likes: 89,
    comments: 42,
    shares: 3,
  },
  {
    id: '4',
    author: {
      name: 'Дмитрий Волков',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      isOnline: true,
    },
    content: 'Закат на берегу океана - лучшее завершение рабочей недели 🌅 Иногда нужно просто остановиться и насладиться моментом. Как вы проводите свои выходные?',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
    timestamp: '8 часов назад',
    likes: 342,
    comments: 56,
    shares: 23,
  },
];

export default function Index() {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);

  const handleCreatePost = (content: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: {
        name: 'Иван Иванов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        isOnline: true,
      },
      content,
      timestamp: 'Только что',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 mr-80 min-h-screen">
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          <Stories />
          <CreatePost onCreatePost={handleCreatePost} />
          
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div 
                key={post.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Post post={post} />
              </div>
            ))}
          </div>

          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">
              Вы просмотрели все новые записи
            </p>
          </div>
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}
