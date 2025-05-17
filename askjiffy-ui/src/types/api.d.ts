interface ChatSessionHistory{
    id: number;
    title: string;
    updatedAt: Date;   
}

interface Vehicle{
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

enum QuestionType{
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