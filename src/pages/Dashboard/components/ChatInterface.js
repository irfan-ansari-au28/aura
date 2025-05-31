import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { User, Bot, Copy, Send, FileText } from 'lucide-react';
import useToast from '../../../hooks/useToast';
import axiosInstance from '../../../axiosInstance';


export default function ChatInterface({ selectedProject }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { showToast } = useToast();
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    showToast('Copied to clipboard!');
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && selectedProject?.id) {
      const userMessage = {
        id: Date.now().toString(),
        content: inputMessage,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
      try {
        const payload = {
          project_id: selectedProject.id,
          agent_type: userData.role,
          message: userMessage.content,
        };
        const response = await axiosInstance.post('/conversations', payload);
        const data = response.data;
        const botMessage = {
          id: data.id,
          content: data.response,
          role: data.agent_type,
          timestamp: new Date(data.created_at),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        showToast('Failed to send message', { type: 'error' });
      }
    }
  };

  const generateSampleDocuments = () => {
    return [
      {
        id: Date.now().toString(),
        name: `${selectedProject?.name}-summary.docx`,
        type: 'docx',
        content: `Summary document for ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 1).toString(),
        name: `${selectedProject?.name}-notes.txt`,
        type: 'txt',
        content: `Notes about ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 2).toString(),
        name: `${selectedProject?.name}-presentation.pptx`,
        type: 'ppt',
        content: `Presentation for ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 3).toString(),
        name: `${selectedProject?.name}-report.pdf`,
        type: 'pdf',
        content: `Report for ${selectedProject?.name}`
      }
    ];
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="h-4 w-4 mr-2 text-red-500" />;
      case 'docx': return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
      case 'ppt': return <FileText className="h-4 w-4 mr-2 text-orange-500" />;
      default: return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  return (
    <Box display="flex" flexDirection="column" flex={1} height="100%">
      <Box flex={1} overflow="auto" p={2}>
        {messages.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Box textAlign="center" maxWidth={400}>
              <Box fontWeight="fontWeightBold" fontSize={20} mb={1}>
                Start chatting about {selectedProject?.name}
              </Box>
              <Box color="text.secondary">Send a message to begin your conversation about this project.</Box>
            </Box>
          </Box>
        ) : (
          messages.map((message) => (
            <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
              <Box
                maxWidth={600}
                borderRadius={2}
                p={2}
                bgcolor={message.role === 'user' ? 'primary.main' : 'grey.100'}
                color={message.role === 'user' ? 'primary.contrastText' : 'text.primary'}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  {message.role === 'user' ? (
                    <User style={{ height: 16, width: 16, marginRight: 8 }} />
                  ) : (
                    <Bot style={{ height: 16, width: 16, marginRight: 8 }} />
                  )}
                  <Box fontSize={12} fontWeight="fontWeightMedium">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </Box>
                  <Box fontSize={12} ml={2}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Box>
                  {message.role === 'assistant' && (
                    <Button 
                      onClick={() => handleCopyMessage(message.content)}
                      size="small"
                      sx={{ minWidth: 0, ml: 1, color: 'grey.600' }}
                      title="Copy message"
                    >
                      <Copy style={{ height: 16, width: 16 }} />
                    </Button>
                  )}
                </Box>
                <Box>{message.content}</Box>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message about ${selectedProject?.name}...`}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !selectedProject?.name}
        >
          <Send style={{ height: 20, width: 20 }} />
        </Button>
      </Box>
    </Box>
  );
}