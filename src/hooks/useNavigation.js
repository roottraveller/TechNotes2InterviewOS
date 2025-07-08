import { useNavigate } from 'react-router-dom';
import { appData } from '../config';

/**
 * Custom hook for navigation logic
 * Handles topic and subtopic navigation with mobile menu closing
 */
export const useNavigation = (closeMobileMenu) => {
  const navigate = useNavigate();

  const handleTopicSelect = (topicId) => {
    if (topicId) {
      navigate(`/topic/${topicId}`);
    } else {
      // If topicId is null (deselecting), go back to home
      navigate('/');
    }
  };

  const handleSubtopicSelect = (subtopicId) => {
    // Find the topic that contains this subtopic
    const parentTopic = appData.topics.find(topic => 
      topic.subtopics.some(subtopic => subtopic.id === subtopicId)
    );
    
    if (parentTopic) {
      navigate(`/topic/${parentTopic.id}/${subtopicId}`);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    closeMobileMenu();
  };

  const handleAboutClick = () => {
    navigate('/about');
    closeMobileMenu();
  };

  const handleTopicsClick = () => {
    navigate('/topics');
    closeMobileMenu();
  };

  const handleMentorshipClick = () => {
    navigate('/mentorship');
    closeMobileMenu();
  };

  return {
    handleTopicSelect,
    handleSubtopicSelect,
    handleHomeClick,
    handleAboutClick,
    handleTopicsClick,
    handleMentorshipClick
  };
}; 