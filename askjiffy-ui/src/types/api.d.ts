interface ChatSessionHistory {
    id: number;
    title: string;
    updatedAt: Date;   
}

//Req Objects
interface ChatRequest {
    vehicleId: number;
    initialQuestionText: string;
}

interface NewMessage {
    id?: number;
    questionText: string;
}

// Resp. Objects
interface ChatSession {
    id: number;
    title: string;
    vehicle: Vehicle;
    chatMessages: ChatMessage[];
    updatedAt: Date;
}

interface ChatMessage{
    id: number,
    question: string,
    response?: string
}

interface Vehicle {
    id?: number;
    make: string;
    model: string;
    trim?: string;
    year: number;
    chassis? : string | null;
    transmission? : Transmission | null;
    mileage?: int | null;
    //imageUrl: string
}

enum QuestionType {
    Repair = 0,
    Parts = 1,
    Pricing = 2,
    Diagnose = 3,
    Maintenance = 4
}

enum Transmission
{
    Automatic = 0,
    Manual = 1,
    CVT = 2,
}