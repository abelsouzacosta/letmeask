import { ReactNode } from 'react';

import '../styles/questions.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
};

export function QuestionBox({ content, author: { name, avatar }, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}
