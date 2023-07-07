import React, { useState } from "react";
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from "./Statistics/Statistics";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0
//   }
const App = () => {
  const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0})

  const leaveFeedback = ({ target: { name } }) => {
    setFeedback(prevState => ({
      ...prevState,
      [name]: prevState[name] + 1,
    }));
  };
  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  }
  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const totalFeedback = countTotalFeedback();
  
    if (totalFeedback === 0) {
      return 0;
    }
  
    const percentage = (good * 100) / totalFeedback;
    return Math.round(percentage);
  }
  
 
    const { good, neutral, bad } = feedback;

    const totalFeedback = countTotalFeedback();
    const positivePercentage = countPositiveFeedbackPercentage(totalFeedback);

    return (
      <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          leaveFeedback={leaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
    );
  }
  

  export default App;

