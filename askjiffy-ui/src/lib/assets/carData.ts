// src/lib/carData.ts

interface CarModels {
    [model: string]: string[]; // Now each model has a list of trims
  }
  
interface ManufacturerData {
  [manufacturer: string]: CarModels;
}

const carData: ManufacturerData = {
  "Toyota": {
    "Camry": ["LE", "SE", "XLE", "XSE", "TRD"],
    "Corolla": ["L", "LE", "SE", "XLE", "XSE"],
    "RAV4": ["LE", "XLE", "XLE Premium", "Adventure", "Limited"],
    "Highlander": ["L", "LE", "XLE", "Limited", "Platinum"],
    "Tacoma": ["SR", "SR5", "TRD Sport", "TRD Off-Road", "Limited"],
    "Tundra": ["SR", "SR5", "Limited", "Platinum", "1794 Edition"],
    "4Runner": ["SR5", "Trail Special Edition", "TRD Off-Road", "Limited", "Nightshade"],
    "Sienna": ["LE", "XLE", "XSE", "Limited", "Platinum"],
    "Avalon": ["XLE", "XSE", "Touring", "Limited", "TRD"],
    "C-HR": ["LE", "XLE", "Nightshade", "Limited"],
    "Venza": ["LE", "XLE", "Limited"],
    "Prius": ["L Eco", "LE", "XLE", "Limited", "Nightshade"],
    "Supra": ["2.0", "3.0", "3.0 Premium", "A91 Edition"],
    "GR86": ["Base", "Premium"],
    "Land Cruiser": ["Base", "Heritage Edition"]
  },
  "Honda": {
    "Accord": ["LX", "Sport", "EX-L", "Touring"],
    "Civic": ["LX", "Sport", "EX", "EX-L", "Touring"],
    "CR-V": ["LX", "EX", "EX-L", "Touring"],
    "Pilot": ["LX", "EX", "EX-L", "Touring", "Elite"],
    "Odyssey": ["LX", "EX", "EX-L", "Touring", "Elite"],
    "HR-V": ["LX", "Sport", "EX", "EX-L"],
    "Ridgeline": ["Sport", "RTL", "RTL-E", "Black Edition"],
    "Fit": ["LX", "Sport", "EX", "EX-L"],
    "Passport": ["Sport", "EX-L", "Touring", "Elite"],
    "Insight": ["LX", "EX", "Touring"],
    "Clarity": ["Plug-In Hybrid", "Fuel Cell"],
    "Element": ["LX", "EX", "SC"],
    "Crosstour": ["EX", "EX-L"],
    "S2000": ["Base", "CR"],
    "Prelude": ["Base", "Type SH"]
  },
  "Ford": {
    "F-150": ["XL", "XLT", "Lariat", "King Ranch", "Platinum", "Limited"],
    "Mustang": ["EcoBoost", "GT", "Mach 1", "Shelby GT500"],
    "Escape": ["S", "SE", "SEL", "Titanium"],
    "Explorer": ["Base", "XLT", "Limited", "ST", "Platinum"],
    "Edge": ["SE", "SEL", "Titanium", "ST"],
    "Ranger": ["XL", "XLT", "Lariat"],
    "Bronco": ["Base", "Big Bend", "Black Diamond", "Outer Banks", "Badlands", "Wildtrak", "First Edition"],
    "Maverick": ["XL", "XLT", "Lariat"],
    "Fusion": ["S", "SE", "SEL", "Titanium", "Sport"],
    "Focus": ["S", "SE", "SEL", "Titanium", "ST"],
    "Taurus": ["SE", "SEL", "Limited", "SHO"],
    "Expedition": ["XLT", "Limited", "King Ranch", "Platinum"],
    "EcoSport": ["S", "SE", "Titanium", "SES"],
    "Transit": ["Cargo Van", "Passenger Van", "Crew Van"],
    "GT": ["Base", "Carbon Series", "Liquid Carbon"]
  },
  "Chevrolet": {
    "Silverado 1500": ["Work Truck", "Custom", "LT", "RST", "LTZ", "High Country"],
    "Malibu": ["L", "LS", "RS", "LT", "Premier"],
    "Equinox": ["LS", "LT", "RS", "Premier"],
    "Traverse": ["LS", "LT", "RS", "Premier", "High Country"],
    "Trailblazer": ["LS", "LT", "ACTIV", "RS"],
    "Tahoe": ["LS", "LT", "RST", "Z71", "Premier", "High Country"],
    "Suburban": ["LS", "LT", "RST", "Z71", "Premier", "High Country"],
    "Colorado": ["Work Truck", "LT", "Trail Boss", "Z71", "ZR2"],
    "Camaro": ["1LS", "1LT", "2LT", "3LT", "LT1", "1SS", "2SS", "ZL1"],
    "Corvette": ["Stingray", "Z06", "E-Ray"],
    "Bolt EV": ["1LT", "2LT"],
    "Bolt EUV": ["LT", "Premier"],
    "Blazer": ["2LT", "3LT", "RS", "Premier"],
    "Trax": ["LS", "1RS", "LT", "2RS", "ACTIV"]
  },
  "Nissan": {
    "Sentra": ["S", "SV", "SR"],
    "Altima": ["S", "SV", "SR", "SL"],
    "Maxima": ["SV", "SR", "Platinum"],
    "Rogue": ["S", "SV", "SL", "Platinum"],
    "Pathfinder": ["S", "SV", "SL", "Platinum"],
    "Titan": ["S", "SV", "PRO-4X", "Platinum Reserve"],
    "Frontier": ["S", "SV", "PRO-4X"],
    "Murano": ["S", "SV", "SL", "Platinum"],
    "Armada": ["S", "SV", "SL", "Platinum"],
    "Kicks": ["S", "SV", "SR"],
    "Versa": ["S", "SV", "SR"],
    "Z": ["Sport", "Performance"],
    "Leaf": ["S", "SV", "SL Plus"]
  },
  "Hyundai": {
    "Elantra": ["SE", "SEL", "N Line", "Limited"],
    "Sonata": ["SE", "SEL", "SEL Plus", "N Line", "Limited"],
    "Tucson": ["SE", "SEL", "XRT", "N Line", "Limited"],
    "Santa Fe": ["SE", "SEL", "XRT", "Limited", "Calligraphy"],
    "Palisade": ["SE", "SEL", "XRT", "Limited", "Calligraphy"],
    "Kona": ["SE", "SEL", "N Line", "Limited"],
    "Venue": ["SE", "SEL", "Limited"],
    "Accent": ["SE", "SEL"],
    "Veloster N": ["Base"],
    "Ioniq 5": ["SE Standard Range", "SE", "SEL", "Limited"],
    "Ioniq 6": ["SE", "SEL", "Limited"],
    "Santa Cruz": ["SE", "SEL", "SEL Premium", "Limited"]
  },
  "Kia": {
    "Forte": ["LX", "LXS", "GT-Line", "GT"],
    "K5": ["LXS", "GT-Line", "EX", "GT"],
    "Sportage": ["LX", "EX", "SX", "SX Prestige", "X-Line", "X-Pro", "X-Pro Prestige"],
    "Sorento": ["LX", "S", "EX", "SX", "SX Prestige", "X-Line", "X-Pro"],
    "Telluride": ["LX", "S", "EX", "SX", "SX Prestige", "X-Line", "X-Pro"],
    "Soul": ["LX", "S", "GT-Line", "EX"],
    "Niro": ["LX", "EX", "SX Touring"],
    "Rio": ["LX", "S"],
    "Stinger": ["GT-Line", "GT", "GT2"],
    "EV6": ["Light", "Wind", "GT-Line", "GT"],
    "EV9": ["Light Long Range RWD", "Wind AWD", "Land AWD", "GT-Line AWD"],
    "Carnival": ["LX", "LXS", "EX", "SX", "SX Prestige"]
  },
  "Mercedes-Benz": {
    "C-Class Sedan": ["C 300", "AMG C 43", "AMG C 63 S E PERFORMANCE"],
    "E-Class Sedan": ["E 350", "E 450", "AMG E 53", "AMG E 63 S"],
    "S-Class Sedan": ["S 500", "S 580", "AMG S 63 E PERFORMANCE", "Maybach S 580", "Maybach S 680"],
    "GLC SUV": ["GLC 300", "AMG GLC 43", "AMG GLC 63 S E PERFORMANCE"],
    "GLE SUV": ["GLE 350", "GLE 450", "AMG GLE 53", "AMG GLE 63 S"],
    "GLS SUV": ["GLS 450", "GLS 580", "Maybach GLS 600", "AMG GLS 63"],
    "A-Class Sedan": ["A 220", "AMG A 35", "AMG A 45 S"],
    "CLA Coupe": ["CLA 250", "AMG CLA 35", "AMG CLA 45 S"],
    "CLS Coupe": ["CLS 450", "AMG CLS 53"],
    "GLA SUV": ["GLA 250", "AMG GLA 35", "AMG GLA 45 S"],
    "GLB SUV": ["GLB 250", "AMG GLB 35"],
    "EQS Sedan": ["EQS 450+", "EQS 450 4MATIC", "EQS 580 4MATIC", "AMG EQS 53"],
    "EQE Sedan": ["EQE 350+", "EQE 350 4MATIC", "EQE 500 4MATIC", "AMG EQE 43", "AMG EQE 53"],
    "C-Class Coupe": ["C 300", "AMG C 43", "AMG C 63"],
    "E-Class Coupe": ["E 450", "AMG E 53"]
  },
  "BMW": {
    "3 Series Sedan": ["330i", "330i xDrive", "M340i", "M3"],
    "5 Series Sedan": ["530i", "530i xDrive", "540i", "540i xDrive", "M550i", "M5"],
    "7 Series Sedan": ["740i", "760i xDrive", "i7 xDrive60", "M760e xDrive"],
    "X1 SUV": ["xDrive28i", "M35i"],
    "X3 SUV": ["xDrive30i", "M40i", "M"],
    "X5 SUV": ["xDrive40i", "xDrive50e", "M60i", "M"],
    "2 Series Coupe": ["230i", "M240i", "M2"],
    "4 Series Coupe": ["430i", "430i xDrive", "M440i", "M4"],
    "8 Series Coupe": ["840i", "840i xDrive", "M850i xDrive", "M8"],
    "i4 Gran Coupe": ["eDrive35", "eDrive40", "M50"],
    "iX SUV": ["xDrive50", "M60"],
    "Z4 Roadster": ["sDrive30i", "M40i"]
  },
  "Audi": {
    "A3 Sedan": ["40 TFSI", "S3"],
    "A4 Sedan": ["40 TFSI", "45 TFSI", "S4", "RS 4"],
    "A6 Sedan": ["45 TFSI", "55 TFSI", "S6", "RS 6"],
    "A8 Sedan": ["55 TFSI", "60 TFSI", "S8"],
    "Q3 SUV": ["40 TFSI", "45 TFSI", "RS Q3"],
    "Q5 SUV": ["40 TFSI", "45 TFSI", "SQ5", "RS Q5"],
    "Q7 SUV": ["45 TFSI", "55 TFSI", "SQ7"],
    "TT Coupe": ["40 TFSI", "TTS", "TT RS"],
    "R8 Coupe": ["V10 performance RWD", "V10 performance quattro"],
    "e-tron GT": ["Premium Plus", "Prestige", "RS e-tron GT"],
    "Q4 e-tron SUV": ["40 e-tron", "45 e-tron quattro", "50 e-tron quattro"],
    "Q8 e-tron SUV": ["50 e-tron quattro", "55 e-tron quattro", "SQ8 e-tron"]
  },
  "Volkswagen": {
    "Jetta": ["S", "Sport", "SE", "SEL"],
    "Golf GTI": ["S", "SE", "Autobahn"],
    "Golf R": ["Base"],
    "Taos": ["S", "SE", "SEL"],
    "Tiguan": ["S", "SE", "SE R-Line Black", "SEL R-Line"],
    "Atlas": ["SE", "SE with Technology", "SEL", "SEL R-Line"],
    "ID.4": ["Standard", "S", "Pro", "Pro S", "Pro S Plus"],
    "Passat": ["SE", "R-Line"],
    "Arteon": ["SE", "SEL R-Line", "SEL Premium R-Line"],
    "Atlas Cross Sport": ["SE", "SE with Technology", "SEL", "SEL R-Line"],
    "Beetle": ["S", "SE", "Final Edition SE", "Final Edition SEL"]
  }
} as const;

export default carData;