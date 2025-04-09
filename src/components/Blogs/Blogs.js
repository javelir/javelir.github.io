import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './Blogs.css';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Function to fetch all blog posts
    const fetchBlogPosts = async () => {
      try {
        // This uses webpack's require.context to get all .md files from the blogs directory
        const blogContext = require.context('../../blogs', false, /\.md$/);
        const blogFiles = blogContext.keys();

        // Modify this part of the code to ensure that all asynchronous operations are properly awaited
        const postsPromises = blogFiles.map(async (file) => {
          // Extract the filename without extension to use as ID
          const id = file.replace(/^\.\//, '').replace(/\.md$/, '');
          
          let title = id.split('-').join(' ');
          let description = '';
          let date = new Date().toLocaleDateString();
          let tags = [];

          try {
            // Wait for the import to complete
            const res = await import(`../../blogs/${id}.md`);
            // Waiting to get text content
            const response = await fetch(res.default);
            const text = await response.text();
            
            // Extract title
            const titleMatch = text.match(/^#\s+(.*)$/m);
            if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim();
            }

            // Extract date metadata
            const dateMatch = text.match(/^- date:\s*(.*)$/m);
            if (dateMatch && dateMatch[1]) {
                date = dateMatch[1].trim();
            }

            // Tags metadata
            const tagsMatch = text.match(/^- tags:\s*(.*)$/m);
            if (tagsMatch && tagsMatch[1]) {
              tags = tagsMatch[1].split(',').map(tag => tag.trim());
            }

            // Brief/description metadata
            const briefMatch = text.match(/^- brief:\s*(.*)$/m);
            if (briefMatch && briefMatch[1]) {
              description = briefMatch[1].trim();
            }

            // Limit description length
            if (description.length > 150) {
              description = description.substring(0, 147) + '...';
            }
            
            return {
              id,
              title,
              description,
              date,
              tags,
              path: `/blogs/${id}`
            };
          } catch (err) {
            console.error('Error importing markdown file:', err);
            // Return a basic object to avoid the entire Promise.all failure
            return {
              id,
              title,
              description: '加载失败',
              date,
              tags,
              path: `/blogs/${id}`
            };
          }
        });

        // Wait for all Promises to complete
        const posts = await Promise.all(postsPromises);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="blogs-container">
      <div className="blog-list">
        {blogPosts.map(post => (
          <Link key={post.id} to={post.path} className="blog-link">
            <Card 
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;