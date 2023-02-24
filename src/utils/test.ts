import { platToTree } from './utils'

const data = [
  {
    id: 11,
    name: 'g1',
    parentId: 0,
    createdAt: '2023-02-22T12:34:44.797Z',
    updatedAt: '2023-02-22T12:34:44.797Z',
    deletedAt: null,
  },
  {
    id: 12,
    name: 'g1-1',
    parentId: 11,
    createdAt: '2023-02-22T12:34:57.077Z',
    updatedAt: '2023-02-22T12:34:57.077Z',
    deletedAt: null,
  },
  {
    id: 13,
    name: 'g1-2',
    parentId: 11,
    createdAt: '2023-02-22T12:35:34.955Z',
    updatedAt: '2023-02-22T12:35:34.955Z',
    deletedAt: null,
  },
  {
    id: 14,
    name: 'g1-1-1',
    parentId: 12,
    createdAt: '2023-02-22T12:35:51.218Z',
    updatedAt: '2023-02-22T12:35:51.218Z',
    deletedAt: null,
  },
  {
    id: 15,
    name: 'g1-1-2',
    parentId: 12,
    createdAt: '2023-02-22T12:35:55.485Z',
    updatedAt: '2023-02-22T12:35:55.485Z',
    deletedAt: null,
  },
  {
    id: 16,
    name: 'g1-1-3',
    parentId: 12,
    createdAt: '2023-02-22T12:36:15.732Z',
    updatedAt: '2023-02-22T12:36:15.732Z',
    deletedAt: null,
  },
]

const x = platToTree(data)
console.log('x', x)
console.log('x[0].children', x[0].children)
console.log('x[0].children[0]', x[0].children![0].children)
// console.dir(platToTree(data))
