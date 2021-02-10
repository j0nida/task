const DemoData = {
    resources: [
        {
            id: 'r1',
            name: 'Room1',
        },
        {
            id: 'r2',
            name: 'Room2',
        },
        {
            id: 'r3',
            name: 'Room3',
        },
        {
            id: 'r4',
            name: 'Room4',
        },
        {
            id: 'r5',
            name: 'Room5',
        },
        {
            id: 'r6',
            name: 'Room6',
        },
        {
            id: 'r7',
            name: 'Room7',
        }
    ],
    events: [
        {
            id: 1,
            start: '2017-12-17 15:00:00',
            end: '2017-12-19 12:00:00',
            resourceId: 'r1',
            title: 'Reservation 1',
            bgColor: '#D9D9D9'
        },
        {
            id: 2,
            start: '2017-12-18 15:00:00',
            end: '2017-12-22 12:00:00',
            resourceId: 'r2',
            title: 'I am not resizable',
        },
        {
            id: 3,
            start: '2017-12-11 15:00:00',
            end: '2017-12-17 12:00:00',
            resourceId: 'r3',
            title: 'One Nje',
        },
        {
            id: 15,
            start: '2017-12-18 15:00:00',
            end: '2017-12-19 12:00:00',
            resourceId: 'r3',
            title: 'Two Dy',
        },
        {
            id: 16,
            start: '2017-12-19 15:00:00',
            end: '2017-12-25 12:00:00',
            resourceId: 'r3',
            title: 'Tree',
        },
        {
            id: 4,
            start: '2017-12-17 15:00:00',
            end: '2017-12-20 12:00:00',
            resourceId: 'r4',
            title: 'I am not start-resizable',
        },
        {
            id: 5,
            start: '2017-12-19 15:30:00',
            end: '2017-12-20 12:00:00',
            resourceId: 'r5',
            title: 'I am not end-resizable',
        },
        {
            id: 6,
            start: '2017-12-18 15:35:00',
            end: '2017-12-21 12:00:00',
            resourceId: 'r6',
            title: 'I am normal'
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 12:00:00',
            resourceId: 'r7',
            title: 'I am exceptional',
            bgColor: '#FA9E95'
        },
        {
            id: 12,
            start: '2017-12-19 15:00:00',
            end: '2017-12-20 12:00:00',
            resourceId: 'r1',
            title: 'Reservation 2'
        },
        {
            id: 13,
            start: '2017-12-20 15:00:00',
            end: '2017-12-22 12:00:00',
            resourceId: 'r1',
            title: 'Reservation 3'
        },
    ],
}

export default DemoData
