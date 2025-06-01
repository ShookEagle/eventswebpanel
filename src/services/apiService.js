export const getMapGroups = () =>
    fetch('http://localhost:8000/api/mapgroups.php').then(res => res.json());

export const saveMapGroups = (groups) =>
    fetch('http://localhost:8000/api/mapgroups.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groups)
    });