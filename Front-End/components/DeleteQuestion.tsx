import React from "react";

interface DeleteConfirmationProps {
  questionId: string;
  onConfirm: (questionId: string) => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  questionId,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm(questionId);
  };

  return (
    <div>
      <p>Are you sure you want to delete this question?</p>
      <button onClick={handleConfirm}>Confirm</button>
      <button>Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
