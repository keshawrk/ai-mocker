"use client"
import { db } from '@/utils/db';  // Make sure this path is correct
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({params}) {
    // const params = useParams();
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    },[])

    const GetInterviewDetails = async() => {
            const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))

            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
            
            // console.log(result);
            
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* {Questions} */}
        <QuestionsSection 
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}

        />

        {/* {Video/AudioRecording} */}
        <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
        />
    </div>
  )
}

export default StartInterview
