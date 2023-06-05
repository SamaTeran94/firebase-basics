import { useEffect, useState } from 'react'
import { db } from '../config/Firebase'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import Team from './Team';

const Teams = () => {

    const [teams, setTeams] = useState([])

    // NEW MOVIE STATES

    const [newTeamsName, setnewTeamName] = useState('')
    const [newTeamFoundationDate, setnewTeamFoundationDate] = useState(0)
    const [newTeamInterTrophy, setNewTeamInterTrophy] = useState(false)
    const [newShirtColor, setnewShirtColor] = useState('')

    //REFERENCE TO OUR TEAMS COLLECTION
    const teamsCollectionRef = collection(db, 'teams')

    const getTeams = async () => {
        //READ THE DATA
        try {
            const data = await getDocs(teamsCollectionRef);
            //console.log(data)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            //SET THE MOVIE LIST
            setTeams(filteredData)
            console.log(filteredData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeams()
    }, [])

    //ADD A NEW TEAM

    const onSubmitTeam = async () => {
        try {
            await addDoc(teamsCollectionRef, { name: newTeamsName, foundationDate: newTeamFoundationDate, internationalTrophy: newTeamInterTrophy, shirtColor: newShirtColor })
            setnewTeamName('')
            setnewShirtColor('')
            setNewTeamInterTrophy(false)
            setnewTeamFoundationDate(0)
            getTeams()
        } catch (error) {
            alert(error)
        } finally {
            alert('Team Created!')
        }
    }

    //DELETE A TEAM

    const deleteTeam = async (id) => {
        const teamDoc = doc(db, "teams", id)
        await deleteDoc(teamDoc)
        getTeams()
    }

    return (
        <>
            <div className='flex flex-col items-center gap-3'>
                <h1>Create a new team</h1>
                <input className="border border-black" placeholder='Team Name ...' onChange={(e) => setnewTeamName(e.target.value)} />
                <input className="border border-black" placeholder='Shirt Color ...' onChange={(e) => setnewShirtColor(e.target.value)} />
                <input className="border border-black" placeholder='Foundation Date ...' type='number' onChange={(e) => setnewTeamFoundationDate(Number(e.target.value))} />
                <div className='flex items-center'>
                    <label className='pr-3'>International Trophy</label>
                    <input type='checkbox' checked={newTeamInterTrophy} onChange={(e) => setNewTeamInterTrophy(e.target.checked)} />
                </div>
                <button onClick={onSubmitTeam} className="border border-black px-3 py-1 bg-gray-400" >Add Team</button>
            </div>

            <Team teams={teams} deleteTeam={deleteTeam} />
        </>
    )
}

export default Teams
