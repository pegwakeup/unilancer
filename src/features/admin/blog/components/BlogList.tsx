import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Edit3, Trash2 } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogList = ({ posts, onEdit, onDelete }: BlogListProps) => {
  return (
    <div className="bg-dark-light border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[800px] sm:min-w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 font-medium text-base">Başlık</th>
                <th className="text-left py-4 px-6 font-medium hidden sm:table-cell">Kategori</th>
                <th className="text-left py-4 px-6 font-medium hidden lg:table-cell">Yazar</th>
                <th className="text-left py-4 px-6 font-medium hidden md:table-cell">Tarih</th>
                <th className="text-left py-4 px-6 font-medium">Durum</th>
                <th className="text-right py-4 px-6 font-medium min-w-[120px]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr 
                  key={post.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-10 h-10 rounded-lg object-cover hidden sm:block"
                      />
                      <div>
                        <h4 className="font-medium text-base">{post.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-1 hidden sm:block">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.author.avatar_url}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <div className="flex flex-col text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.read_time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      post.published
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(post)}
                        className="p-3 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Düzenle"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="p-3 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;