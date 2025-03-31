import { Button } from "../button";
import { Typewriter } from "../typewriter";

const typeWriteTexts = ["Repairs", "Parts", "Pricing", "Diagnosis", "Maintenance"]

interface QuestionTypeSelectProps{
    setQuestionType: (value : number) => void;
}



export default function QuestionTypeSelect({setQuestionType} : QuestionTypeSelectProps){
    const questionTypeMap: Record<string, number> = {
        Repair: 0,
        Parts: 1,
        Pricing: 2,
        Diagnose: 3,
        Maintenance: 4
    };

    const handleClick = (key:string) => {
        const enumValue = questionTypeMap[key];
        setQuestionType(enumValue)
    }

    return(
        <div id="questionTypeSelect" className="flex flex-col w-full max-w-[700px] items-center gap-3">
            <Typewriter texts={typeWriteTexts} delay={1} baseText="I can help with... "/>
            <div id="questionTypes" className="flex w-full">
                <ul className="flex gap-2 w-full">
                    {Object.keys(questionTypeMap)
                    .filter(key => isNaN(Number(key)))
                    .map((key) => (
                        <li key={key} className="w-full">
                            <Button type="button" className="bg-white w-full" onClick={() => handleClick(key)} variant={"outline"}>
                                {key}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}