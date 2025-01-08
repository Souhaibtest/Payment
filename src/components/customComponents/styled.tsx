// import * as React from "react";
// import { useMemo } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import { Badge } from "../components/ui/badge";
// import {
//   ChevronDown,
//   ExternalLink,
//   HelpCircle,
//   Menu,
//   MoreVertical,
//   Plus,
//   Search,
//   Settings,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { cn } from "../lib/utils.js";
// import { IoDocumentText } from "react-icons/io5";
// import { GrFormNext } from "react-icons/gr";
// import { TbCaretUpDownFilled } from "react-icons/tb";
// import { IoIosArrowDropright } from "react-icons/io";
// import { FaBell } from "react-icons/fa";
// import { Pyramid, FileText } from "lucide-react";

// const projects = [
//   {
//     id: 1,
//     name: "Allosaurus web app",
//     status: "On track",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 2,
//     name: "MicroRaptor website",
//     status: "On track",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 3,
//     name: "Tarius landing page",
//     status: "On hold",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 4,
//     name: "Rugops App",
//     status: "At risk",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: true,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 5,
//     name: "Erketu",
//     status: "Potential risk",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 8,
//     name: "Rania",
//     status: "On hold",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 6,
//     name: "Elena",
//     status: "At risk",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
//   {
//     id: 7,
//     name: "Souhaib",
//     status: "On track",
//     lastUpdate: "15 Mar 2021, 12:47 PM",
//     external: false,
//     pmAvatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
//     resources: 3,
//     startDate: "15 May 2021",
//     endDate: "15 Aug 2021",
//     estimation: "US$ 10.5k",
//   },
// ];

// export function ProjectDashboard() {
//   const [isCollapsed, setIsCollapsed] = React.useState(true);
//   const [sorting, setSorting] = React.useState([]);
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [activeTab, setActiveTab] = React.useState("All");

//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <input
//           type="checkbox"
//           className="rounded border-gray-300"
//           checked={table.getIsAllPageRowsSelected()}
//           onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <input
//           type="checkbox"
//           className="rounded border-gray-300"
//           checked={row.getIsSelected()}
//           onChange={(e) => row.toggleSelected(!!e.target.checked)}
//           aria-label="Select row"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: ".",
//       cell: ({ row }) => (
//         <IoIosArrowDroplight size={18} className="text-[#6C7A9A]" />
//       ),
//     },
//     {
//       accessorKey: "id",
//       header: "#",
//       cell: ({ row }) => (
//         <div className="text-[#6B7A99]">{row.getValue("id")}</div>
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: () => (
//         <div className="flex items-center">
//           PROJECT NAME
//           <TbCaretUpDownFilled className="w-4 h-4 ml-3" />
//         </div>
//       ),
//       cell: ({ row }) => (
//         <div className="font-medium text-[#5351D6] flex items-center gap-2">
//           {row.getValue("name")}
//           {row.original.external && (
//             <ExternalLink className="w-4 h-4 text-[#6B7A99]" />
//           )}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "pmAvatar",
//       header: "PM",
//       cell: ({ row }) => (
//         <Avatar className="w-7 h-7 rounded-md">
//           <AvatarImage src={row.getValue("pmAvatar")} />
//           <AvatarFallback>PM</AvatarFallback>
//         </Avatar>
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "STATUS",
//       cell: ({ row }) => {
//         const status = row.getValue("status");
//         return (
//           <Badge
//             variant={
//               status === "On track"
//                 ? "success"
//                 : status === "At risk"
//                 ? "destructive"
//                 : "warning"
//             }
//             className={cn(
//               "rounded-md",
//               status === "On track" && "bg-[#D9FDEE] text-[#4E7861]",
//               status === "At risk" && "bg-[#FFDEE8] text-[#A0505F]",
//               status === "On hold" && "bg-[#E5EAF3] text-[#898F99]",
//               status === "Potential risk" && "bg-[#FADCBD] text-[#906D48]"
//             )}
//           >
//             {status}
//           </Badge>
//         );
//       },
//     },
//     {
//       accessorKey: "lastUpdate",
//       header: () => (
//         <div className="flex items-center">
//           LAST UPDATE
//           <TbCaretUpDownFilled className="w-4 h-4 ml-3" />
//         </div>
//       ),
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2 text-[#6B7A99]">
//           <IoDocumentText className="w-4 h-4 text-[#5351D6]" />
//           {row.getValue("lastUpdate")}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "resources",
//       header: "RESOURCES",
//       cell: ({ row }) => (
//         <Badge
//           variant="secondary"
//           className="rounded-md bg-[#E5EAF4] h-7 text-[#6B7A99] border-dashed border-[#5351D6]"
//         >
//           {row.getValue("resources")}
//         </Badge>
//       ),
//     },
//     {
//       accessorKey: "timeline",
//       header: () => (
//         <div className="flex items-center">
//           PROJECT TIMELINE
//           <HelpCircle className="w-4 h-4 ml-1" />
//         </div>
//       ),
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           <Badge className="text-sm text-[#696F78] bg-[#E5EAF4] rounded-md h-7">
//             {row.original.startDate}
//           </Badge>
//           <GrFormNext className="text-[#6B7A99]" />
//           <Badge className="text-sm text-[#696F78] bg-[#E5EAF4] rounded-md h-7">
//             {row.original.endDate}
//           </Badge>
//         </div>
//       ),
//     },
//     {
//       accessorKey: "estimation",
//       header: "ESTIMATION",
//       cell: ({ row }) => (
//         <div className="text-black">{row.getValue("estimation")}</div>
//       ),
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => (
//         <Button variant="ghost" size="icon">
//           <MoreVertical className="w-4 h-4 text-[#6B7A99]" />
//         </Button>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data: projects,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   const filteredProjects = React.useMemo(() => {
//     return projects.filter((project) => {
//       if (activeTab === "All") return true;
//       return project.status.toLowerCase().includes(activeTab.toLowerCase());
//     });
//   }, [activeTab]);

//   const tabCounts = useMemo(() => {
//     const counts = {
//       All: projects.length,
//       Risk: 0,
//       "On hold": 0,
//       "Potential risk": 0,
//       "On track": 0,
//       Archived: 0,
//     };
//     projects.forEach((project) => {
//       if (project.status === "At risk") counts.Risk++;
//       else if (project.status === "On hold") counts["On hold"]++;
//       else if (project.status === "Potential risk") counts["Potential risk"]++;
//       else if (project.status === "On track") counts["On track"]++;
//     });
//     return counts;
//   }, []);

//   return (
//     <div className="flex flex-col h-screen bg-[#F7F9FB]">
//       {/* Header for mobile */}
//       <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)}>
//             <Menu className="h-6 w-6" />
//           </Button>
//           <h1 className="text-xl font-bold text-gray-800">Projects</h1>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon">
//             <FaBell className="text-gray-500 w-5 h-5" />
//           </Button>
//           <Avatar className="w-8 h-8">
//             <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" />
//             <AvatarFallback>JD</AvatarFallback>
//           </Avatar>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div
//           className={cn(
//             "bg-[#15144C] text-white shadow-lg transition-all duration-300 overflow-y-auto",
//             isCollapsed ? "w-0 lg:w-20" : "w-52"
//           )}
//         >
//           <nav className="flex flex-col gap-8 p-4">
//             <SidebarItem
//               icon={Pyramid}
//               label="Dashboard"
//               isCollapsed={isCollapsed}
//             />
//             <SidebarItem
//               icon={FileText}
//               label="Projects"
//               isCollapsed={isCollapsed}
//             />
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Header for desktop */}
//           <header className="hidden lg:flex bg-white border-b border-gray-200 p-4 items-center justify-between">
//             <div className="flex items-center">
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
//                 <Badge
//                   variant="secondary"
//                   className="bg-[#E8EBFB] text-[#5350D5]"
//                 >
//                   {tabCounts.All}
//                 </Badge>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="Bell" size="icon">
//                 <FaBell className="text-gray-500 w-10 h-10" />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <HelpCircle className="w-5 h-5 text-gray-500" />
//               </Button>
//               <Avatar className="w-8 h-8">
//                 <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </div>
//           </header>

//           {/* Toolbar */}
//           <div className="bg-white p-4 flex flex-wrap items-center gap-4">
//             <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-1">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-[#6B7A99] border-[#D5E0F2]"
//               >
//                 All
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </Button>
//               
//             </div>
//             <Button
//               size="sm"
//               className="bg-[#5350D5] text-white w-full lg:w-auto"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New project
//             </Button>
//           </div>

//           {/* Tabs */}
//           <div className="bg-white px-4 border-b border-gray-200 overflow-x-auto">
//             <div className="flex gap-4">
//               {Object.entries(tabCounts).map(([tab, count]) => (
//                 <Button
//                   key={tab}
//                   variant="ghost"
//                   className={cn(
//                     "h-9 text-[#6B7A99] hover:text-[#3361FF] whitespace-nowrap",
//                     activeTab === tab && "text-[#5350D5] font-semibold"
//                   )}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                   <Badge
//                     variant="secondary"
//                     className="ml-2 bg-[#E5EBF2] text-[#5350D5]"
//                   >
//                     {count}
//                   </Badge>
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Table */}
//           <div className="flex-1 overflow-auto">
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <TableRow
//                       key={headerGroup.id}
//                       className="bg-[#F7F9FB] border-b border-[#D5E0F2]"
//                     >
//                       {headerGroup.headers.map((header) => {
//                         return (
//                           <TableHead key={header.id} className="text-[#6B7A99]">
//                             {header.isPlaceholder
//                               ? null
//                               : flexRender(
//                                   header.column.columnDef.header,
//                                   header.getContext()
//                                 )}
//                           </TableHead>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//                 </TableHeader>
//                 <TableBody>
//                   {table.getRowModel().rows?.length ? (
//                     table.getRowModel().rows.map((row) => (
//                       <TableRow
//                         key={row.id}
//                         data-state={row.getIsSelected() && "selected"}
//                         className="border-b border-[#D5E0F2]"
//                       >
//                         {row.getVisibleCells().map((cell) => (
//                           <TableCell key={cell.id}>
//                             {flexRender(
//                               cell.column.columnDef.cell,
//                               cell.getContext()
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={columns.length}
//                         className="h-24 text-center"
//                       >
//                         No results.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ icon: Icon, label, isCollapsed }) {
//   return (
//     <button
//       className="flex items-center gap-4 rounded-lg p-2 hover:bg-white/10 w-full"
//       aria-label={label}
//     >
//       <Icon className="h-6 w-6 shrink-0" />
//       {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
//     </button>
//   );
// }
// m;
