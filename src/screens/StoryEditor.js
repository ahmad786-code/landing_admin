import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../firebase'; // Ensure your firebase configuration is correct

const mdParser = new MarkdownIt();

const StoryEditor = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    const [savedMessage, setSavedMessage] = useState('');
    const [isFeaturedStory, setIsFeaturedStory] = useState(false);

    const handleEditorChange = ({ text }) => {
        setMarkdownContent(text);
    };

    const handleSave = async () => {
        try {
            const storageRef = ref(storage, isFeaturedStory ? 'markdown/featured_story.md' : 'markdown/top_story.md');
            await uploadString(storageRef, markdownContent, 'raw');
            setSavedMessage('Markdown content saved successfully!');
        } catch (error) {
            console.error('Error saving markdown:', error);
            setSavedMessage('Failed to save markdown content.');
        }
    };

    const handleCheckboxChange = (e) => {
        setIsFeaturedStory(e.target.checked);
        setMarkdownContent(''); // Reset markdown content when switching
    };

    return (
        <div className='story_editor'>
            <h1>{isFeaturedStory ? 'Featured Stories' : 'Top Stories'}</h1>
            <label>
                <input
                    type="checkbox"
                    checked={isFeaturedStory}
                    onChange={handleCheckboxChange}
                />
                Featured Story
            </label>
            <MdEditor
                value={markdownContent}
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <button onClick={handleSave}>Save</button>
            {savedMessage && <p>{savedMessage}</p>}
            <div className='markdown_content'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default StoryEditor;
