/* eslint-disable react/prop-types */

import { FaTimes } from 'react-icons/fa';

const Team = ({ teams, deleteTeam }) => {
    return (
        <div>
            {teams.map((team) => (
                <div key={team.id} className='flex flex-col items-center pt-5'>
                    <div className='bg-gray-200 p-7 text-center'>
                        <button onClick={() => deleteTeam(team.id)}><FaTimes style={{ color: 'red' }} /></button>
                        <h1 className={`text-3xl ${team.internationalTrophy ? 'text-green-500' : 'text-red-500'}`}>{team.name}</h1>
                        <h1 className={team.shirtColor === 'white' ? 'bg-black p-1' : ''} style={{ color: team.shirtColor }}>{team.shirtColor}</h1>
                        <p className='text-xl'>{team.foundationDate}</p>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default Team
