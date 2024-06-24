
import React, { useState, useEffect } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../firebase'; // Ensure your firebase configuration is correct
 

const mdParser = new MarkdownIt();

const CreateTopStories = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    const [savedMessage, setSavedMessage] = useState('');
 

    const handleEditorChange = ({ text }) => {
        setMarkdownContent(text);
    };

    const handleSave = async () => {
        try {
            const storageRef = ref(storage, 'markdown/top_story.md');
            await uploadString(storageRef, markdownContent, 'raw');
            setSavedMessage('Markdown content saved successfully!');
        } catch (error) {
            console.error('Error saving markdown:', error);
            setSavedMessage('Failed to save markdown content.');
        }
    };

    return (
        <div className='top_stories'>
            <h1>Top Stories</h1>
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

export default CreateTopStories;
