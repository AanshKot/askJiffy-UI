
interface UserProfile{
    id: number;
    email: string;
    role: UserRole;
    chatHistory: UserChat[];
    vehicles: UserVehicle[];
}

interface UserChat{
    id: number;
    title: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

interface UserVehicle{
    id: number;
    make: string;
    model: string;
    year: number;
    //imageUrl: string
}

enum UserRole{
    None = 0,
    Mechanic = 1,
    Moderator = 2,
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