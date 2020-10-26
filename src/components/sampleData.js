// Test database
export const db = {
  requests: [
    {
      uuid: '1105',
      date: '2020-10-10T10:45:00',
      userId: '1',
      status: 'accept',
      type: 'office_stuff'
    },
    {
      uuid: '2254',
      date: '2020-10-20T12:30:00',
      userId: '2',
      status: 'in_progress',
      type: 'salary'
    },
    {
      uuid: '3358',
      date: '2020-10-22T10:45:00',
      userId: '6',
      status: 'deny',
      type: 'salary'
    },
  ],
  users: [
    {
      uuid: '1',
      name: 'Василий Негодуев'
    },
    {
      uuid: '2',
      name: 'Сергей Котеночкин'
    },
    {
      uuid: '3',
      name: 'Владимир Владимирович'
    },
    {
      uuid: '4',
      name: 'Дмитрий Анатольевич'
    },
    {
      uuid: '5',
      name: 'Александр Михайлович'
    },
    {
      uuid: '6',
      name: 'Иван Сусанин'
    },
  ],
  stages: [
    {
      uuid: '1',
      requestId: '1105',
      order: 'default',
      userId: ['1']
    },
    {
      uuid: '2',
      requestId: '2254',
      order: 'default',
      userId: ['2']
    },
    {
      uuid: '3',
      requestId: '1105',
      order: 'any',
      userId: ['3', '4', '5']
    },
    {
      uuid: '4',
      requestId: '2254',
      order: 'every',
      userId: ['3', '4', '5'],
    },
    {
      uuid: '5',
      requestId: '3358',
      order: 'default',
      userId: ['6'],
    },
    {
      uuid: '6',
      requestId: '3358',
      order: 'every',
      userId: ['3', '5'],
    },
    {
      uuid: '7',
      requestId: '3358',
      order: 'any',
      userId: ['4'],
    },
  ],
  points: [
    {
      uuid: '1',
      date: '2020-10-10T10:45:00',
      requestId: '1105',
      stageId: '1',
      userId: '1',
      result: 'create'
    },
    {
      uuid: '2',
      date: '2020-10-20T12:30:00',
      requestId: '2254',
      stageId: '2',
      userId: '2',
      result: 'create'
    },
    {
      uuid: '3',
      date: '2020-10-12T15:30:00',
      requestId: '1105',
      stageId: '3',
      userId: '3',
      result: 'accept'
    },
    {
      uuid: '4',
      date: '2020-10-13T15:30:00',
      requestId: '2254',
      stageId: '4',
      userId: '4',
      result: 'accept'
    },
    {
      uuid: '5',
      date: '2020-10-13T15:50:00',
      requestId: '3358',
      stageId: '5',
      userId: '6',
      result: 'create'
    },
    {
      uuid: '6',
      date: '2020-10-22T10:55:00',
      requestId: '3358',
      stageId: '6',
      userId: '5',
      result: 'accept'
    },
    {
      uuid: '7',
      date: '2020-10-22T10:58:00',
      requestId: '3358',
      stageId: '6',
      userId: '3',
      result: 'accept'
    },
    {
      uuid: '8',
      date: '2020-10-22T12:51:00',
      requestId: '3358',
      stageId: '7',
      userId: '4',
      result: 'deny'
    }
  ]
}

export default db

/**
 * Emulate SQL queries to database to form request data
 * @param {string} uuid 
 */
const selectRequestData = (uuid) => {
  const points = db.points.filter(item => item.requestId === uuid)

  const groups = points.reduce((acc, item) => {
    const {stageId, userId} = item
    const [user] = db.users.filter(item => userId === item.uuid)

    item['userData'] = user
    if (acc[stageId]) {
      acc[stageId].push(item)
    } else {
      acc[stageId] = [item]
    }
    return acc
  }, {})

  const stageIds = Object.keys(groups)

  const requestStages = db.stages.filter(item => stageIds.includes(item.uuid))

  const stages = requestStages.map(item => {
    const {uuid, userId} = item
    const users = db.users.filter(item => userId.includes(item.uuid))

    item['points'] = groups[uuid]
    item['userData'] = users

    const results = groups[uuid].map(item => item.result)

    const resultDispatcher = {
      accept: () => (results.length === userId.length && !results.includes('deny') && item.order === 'every') 
      || (!results.includes('deny') && item.order === 'any' && results.length > 0),
      deny: () => (results.includes('deny')  && results.length > 0),
      create: () => results.includes('create'),
      in_progress: () => true
    }

    for (let i in resultDispatcher) {
      if (resultDispatcher[i]()) {
        item['result'] = i
        break
      }
    }

    return item
  })

  const [request] = db.requests.filter(item => item.uuid === uuid)

  const [user] = db.users.filter(item => request.userId === item.uuid)

  request['stages'] = stages
  request['userData'] = user

  return request
}

/**
 * Emulate server delay for async loading
 * @param {string} uuid 
 */
export const loadRequest = async (uuid) => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(selectRequestData(uuid))
    }, 500)
  })

  return result
}