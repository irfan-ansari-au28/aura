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

  const fetchChatHistory = async () => {
    if (selectedProject?.id) {
      try {
        const response = await axiosInstance.get(`/conversations/${selectedProject.id}`);
        const data = response.data;
        setMessages(data);
      } catch (error) {
        showToast('Failed to fetch chat history', { type: 'error' });
      }
    }
  };

  useEffect(() => {
    fetchChatHistory();
 },[selectedProject]);

  return (
    <Box display="flex" flexDirection="column" flex={1} height="100%" sx={{ background: 'none' }}>
      <Box flex={1} overflow="auto" p={2}>
        {messages.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Box
              textAlign="center"
              maxWidth={400}
              sx={{
                border: '1.5px solid #e0e0e0',
                borderRadius: 2,
                background: 'rgba(245,248,250,0.5)',
                color: '#b0b3c6',
                fontWeight: 400,
                fontSize: 18,
                p: 4,
                boxShadow: 0,
                mx: 'auto',
              }}
            >
              <Box fontWeight={600} fontSize={20} mb={1} color="#b0b3c6">
                Start chatting about {selectedProject?.name || 'your project'}
              </Box>
              <Box color="#b0b3c6" fontSize={15}>
                Send a message to begin your conversation about this project.
              </Box>
            </Box>
          </Box>
        ) : (
          messages.map((message) => (
            <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
              <Box
                maxWidth={600}
                borderRadius={3}
                p={2}
                sx={{
                  background: message.role === 'user'
                    ? 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)'
                    : '#f3f0fa',
                  color: message.role === 'user' ? '#fff' : '#8134af',
                  boxShadow: message.role === 'user' ? 3 : 1,
                  fontFamily: 'Segoe UI, sans-serif',
                  fontSize: 16,
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  {message.role === 'user' ? (
                    <User style={{ height: 16, width: 16, marginRight: 8, color: '#fff' }} />
                  ) : (
                    <Bot style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
                  )}
                  <Box fontSize={12} fontWeight="fontWeightMedium">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </Box>
                  <Box fontSize={12} ml={2} color={message.role === 'user' ? '#fff' : '#8134af'}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Box>
                  {message.role === 'assistant' && (
                    <Button 
                      onClick={() => handleCopyMessage(message.content)}
                      size="small"
                      sx={{ minWidth: 0, ml: 1, color: '#8134af' }}
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
      <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center" sx={{ background: 'rgba(255,255,255,0.95)' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message about ${selectedProject?.name}...`}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          InputProps={{
            style: {
              background: '#fbeee6',
              borderRadius: 8,
              fontFamily: 'Segoe UI, sans-serif',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !selectedProject?.name}
          sx={{
            background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.10)',
            fontSize: 18,
            letterSpacing: 1,
            minWidth: 48,
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
            },
          }}
        >
          <Send style={{ height: 24, width: 24 }} />
        </Button>
      </Box>
    </Box>
  );
}