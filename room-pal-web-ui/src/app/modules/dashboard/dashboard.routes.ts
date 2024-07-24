import { Routes } from "@angular/router";

const DashboardComponent =()=>
    import('./dashboard.component').then(c => c.DashboardComponent)
const MainComponet =()=>
    import('./main/main.component').then(c =>c.MainComponent)
const RoomDetailsComponent=()=>
    import('./room-details/room-details.component').then(c => c.RoomDetailsComponent)
const UpdateRoomComponent=()=>
    import('./update-room/update-room.component').then(c => c.UpdateRoomComponent)
const CreateRoomComponent=()=>
    import('./create-room/create-room.component').then(c => c.CreateRoomComponent)
export const routes :Routes=[
    {path:'',
      loadComponent:DashboardComponent,
         children:[
        {path :'', pathMatch:'full' ,redirectTo:'main'},
        {path:'main',loadComponent:MainComponet},
        {path:'room-details',loadComponent:RoomDetailsComponent},
        {path:'update-room',loadComponent:UpdateRoomComponent},
        {path:'create-room',loadComponent:CreateRoomComponent},
    ]}
]