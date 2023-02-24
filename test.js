const routesData = [
  {
    index: true,
    key: 'home',
    titleKey: 'home',
    link: '/',
  },
  {
    key: 'article',
    titleKey: 'article',
    link: '/article/',
    children: [
      {
        key: 'articleList',
        titleKey: 'articleList',
        link: 'list',
      },
      {
        key: 'articleForm',
        titleKey: 'articleForm',
        link: 'form',
        children: [
          {
            key: 'subform1',
            titleKey: 'subform1',
            link: 'subform1',
            children: [
              {
                key: '_subform1',
                titleKey: '_subform1',
                link: '_subform1',
              },
              {
                key: '_subform2',
                titleKey: '_subform2',
                link: '_subform2',
              },
            ],
          },
          {
            key: 'subform2',
            titleKey: 'subform2',
            link: 'subform2',
          },
          {
            key: 'subform3',
            titleKey: 'subform3',
            link: 'subform3',
          },
        ],
      },
    ],
  },
  {
    key: 'setting',
    titleKey: 'setting',
    link: '/setting',
  },
]

function getAbsoluteLink(menu, routeData) {
  let path = []
  let flag = false
  let level = 0
  function search(menu, routeData) {
    for (let i = 0; i < routeData.length; i++) {
      if (flag) return
      const item = routeData[i]
      if (item.key === menu.key) {
        flag = true
        path.unshift(item.link)
        return
      } else if (item.children && item.children.length > 0) {
        search(menu, item.children)
      }
      if (flag === true) path.unshift(item.link)
    }
  }
  search(menu, routeData, level)
  return path
}

const path = getAbsoluteLink(
  routesData[1].children[1].children[0].children[1],
  routesData,
)
console.log('path', path)
