"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'


    import {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
    } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
  
function Feedback({params}) {

    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])
    const GetFeedback  = async() => {
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
    }
    
    return (
        <div className='p-10 '>

            {feedbackList?.length === 0 && <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Found</h2>
            }
            {feedbackList?.length > 0 &&
            <>
            <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
            <h2 className='text-primary text-lg my-3'>Your overall interview rating <strong>{feedbackList[0]?.rating}</strong></h2>

            <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback for improvement</h2>
            {feedbackList && feedbackList.map((item, index) => (
                <Collapsible key = {index} className='mt-7'>
                <CollapsibleTrigger className='p-2 bg-secondary rounder-lg my-2 text-left flex justify-between gap-7 w-full'>
                {item.question} <ChevronsUpDown className='h-4 w-5'/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>

                    </div>
                    </CollapsibleContent>
                </Collapsible>
                
            ))}
            </>}

            <div className='flex my-7'>
                <Button onClick={() => router.replace('/dashboard')}> Go Home </Button>

            </div>
        </div>
    )
}

export default Feedback
