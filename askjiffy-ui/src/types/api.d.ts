
interface UserProfile{
    id: number;
    email: string;
    role: number;
    ChatHistory: UserChat[];
    Vehicles: UserVehicle[];
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
}