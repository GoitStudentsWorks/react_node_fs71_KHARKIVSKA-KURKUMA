// import TaskToolbar from './TaskToolbar';
import {
  Priority,
  Avatar,
  Description,
  BottomContainer,
  CardContainer,
} from './TaskColumnItems.styled';

const TaskColumnCard = data => {
  const { description, avatarUrl, priority } = data;
  return (
    <CardContainer>
      <Description>{description}</Description>
      <BottomContainer>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <Priority style={{ backgroundColor: getPriorityColor(priority) }}>
          {priority}
        </Priority>
      </BottomContainer>
      {/* <TaskToolbar /> */}
      {/* <TaskModal /> */}
    </CardContainer>
  );
};

const getPriorityColor = priority => {
  if (priority === 'High') return '#EA3D65';
  if (priority === 'Medium') return '#F3B249';
  if (priority === 'Low') return '#72C2F8';
};

export default TaskColumnCard;
