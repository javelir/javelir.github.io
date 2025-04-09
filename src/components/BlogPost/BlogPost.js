import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({
    title: '',
    date: '',
    tags: [],
    brief: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a production app, this would be a fetch to an API
    // For now, we're importing the markdown file directly
    import(`../../blogs/${id}.md`)
      .then(res => {
        // Need to fetch the text content of the file
        fetch(res.default)
          .then(response => response.text())
          .then(text => {
            // Extract metadata from the markdown content
            const titleMatch = text.match(/^#\s+(.*)$/m);
            const dateMatch = text.match(/^date:\s*(.*)$/m);
            const tagsMatch = text.match(/^tags:\s*(.*)$/m);
            const briefMatch = text.match(/^brief:\s*(.*)$/m);
            
            // Update metadata state
            setMetadata({
              title: titleMatch ? titleMatch[1].trim() : id,
              date: dateMatch ? dateMatch[1].trim() : '',
              tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : [],
              brief: briefMatch ? briefMatch[1].trim() : ''
            });
            
            // Set the content for rendering
            setContent(text);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching markdown content:', err);
            setError('Failed to load blog post content');
            setLoading(false);
          });
      })
      .catch(err => {
        console.error('Error importing markdown file:', err);
        setError('Blog post not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="blog-post-loading">Loading...</div>;
  if (error) return <div className="blog-post-error">{error}</div>;

  return (
    <div className="blog-post-container">
      {/* Display metadata */}
      {/* <div className="blog-post-metadata">
        {metadata.date && <div className="blog-post-date">{metadata.date}</div>}
        {metadata.tags.length > 0 && (
          <div className="blog-post-tags">
            {metadata.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">{tag}</span>
            ))}
          </div>
        )}
        {metadata.brief && <div className="blog-post-brief">{metadata.brief}</div>}
      </div> */}
      
      <div className="blog-post-content">
        <ReactMarkdown>{content}</ReactMarkdown>
        {/* ReactDOM.render(
          <ReactMarkdown>{content}</ReactMarkdown>,
          document.getElementById('container')
        ) */}
      </div>
    </div>
  );
};

export default BlogPost;