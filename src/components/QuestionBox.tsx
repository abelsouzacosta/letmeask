import '../styles/questions.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
};

export function QuestionBox({ content, author: { name, avatar } }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>

        </div>
      </footer>
    </div>
  );
}
