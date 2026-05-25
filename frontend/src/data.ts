/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Issue } from './types';

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'INC-2401',
    title: 'Pothole on Oak Street',
    description: 'A deep pothole has formed in the middle of Oak Street near 5th Ave, creating a serious hazard for vehicles and cyclists. It has been expanding over the course of the week due to traffic heavy loads.',
    category: 'Infrastructure',
    subcategory: 'Pothole',
    status: 'In Progress',
    statusText: 'Inspection in Progress',
    location: {
      name: 'Oak St & 5th Ave',
      address: '242 Civic Center Dr, Downtown',
      lat: 37.784,
      lng: -122.418,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApj5FUYyRCEx1cqZsNYLW_30nMN0ouYuOv5tGbuOXIhzQ6e1W_ttK5mdNcRC8WMJFhD7RV-Kgyl8pMp_HXb4_SZt2zkEghk-zh3Inh_FU5GLyaKmCNDKvHBxHXDjJ2RMl2-qWJRM35nJyn8q9s3LQtmGhrvFiAiIT0XjHJJcGI8w-PK6exaufxVmO9UfLl9u5ezO1FWpb0sBSrdGUaDaUY098zW0yGmDmdOX77gIbjUkpIwxlXTkAV9uoX5_K9NXe3XfgVa_NNTP8',
    upvotes: 42,
    followed: false,
    date: 'Oct 24, 2023 • 09:15 AM',
    timeline: [
      {
        title: 'Reported Successfully',
        description: 'Report created by citizen.',
        date: 'Oct 24, 2023 • 09:15 AM',
        status: 'completed',
        icon: 'check_circle'
      },
      {
        title: 'Dispatched to Maintenance',
        description: 'Crew dispatched to schedule repairs.',
        date: 'Oct 25, 2023 • 02:30 PM',
        status: 'completed',
        icon: 'engineering'
      },
      {
        title: 'Inspection in Progress',
        description: 'Our crew is assessing the damage today.',
        date: 'Oct 25, 2023 • 03:00 PM',
        status: 'in_progress',
        icon: 'visibility'
      }
    ],
    comments: [
      {
        id: 'c1',
        userName: 'Sarah Mitchell',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpptOT5vl3FObiE5GDb2q27ZH_dRxNicK1reBZ_74EHkh0TSQUhUeL5ys-nFwMpWA58Qn92lx1QgDuOsBiV6tZNsll1mgdU9uLcIylb8H3gvLid_fh9W2EAg86ImMdC8iDMFYziyHwxN_hO8LXlgHbzIfvzVae3ohOoezXUPPZcgA45F_B4kU3HcR9JumtbXQWuV94O6EFKh29GPWHTzfMh5sclxasRVZH70sr7oCdzftmkpZGm3q_OJQuz6TtCzbnS-RRW0fifOA',
        text: 'I saw them measuring the area this morning. Hopefully it gets fixed before the rain!',
        time: 'Oct 25, 09:45 AM',
        repliesCount: 0,
        upvotes: 12
      },
      {
        id: 'c2',
        userName: 'City Official',
        userAvatar: '',
        text: 'Materials have been ordered. Repairs are scheduled for Tuesday morning.',
        time: 'Oct 25, 02:15 PM',
        repliesCount: 0,
        upvotes: 31,
        isOfficial: true
      }
    ],
    district: 'District 4'
  },
  {
    id: 'INC-7842',
    title: 'Severe Pavement Subsidence on 5th Ave',
    description: 'The sidewalk near the public library has developed significant cracks and a noticeable dip. It poses a tripping hazard for pedestrians and is especially dangerous for those using mobility aids. The issue has worsened following last week\'s heavy rain.',
    category: 'Infrastructure',
    subcategory: 'Sidewalk',
    status: 'In Progress',
    statusText: 'Assigned to Crew',
    location: {
      name: '5th Avenue & E 42nd St',
      address: 'Manhattan, NY 10017',
      lat: 37.765,
      lng: -122.445,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAIHto7TJFsEFD7I0UEdQ1w5ZaeL2KpFETtOoYFYT-iezIGl01HMcJHXXNNC6W94YhEqXBuW6jUCBH6OclToESHeNcQtJIuGorRe8VDWHuadK-Fdxw6coiKg8DKtH81AlgnMDJzAjjR8j9xG8PLphw1YYC917me73EiuOudqvsxVSbb9W2TlwIh9RF24XR2u8a1y-boJy_jrnIWt-veRpVrh6zr77cow7BS4H9UvvGmcZRlJVvbewiXsatkg0au5Fks_oLgdlaFS0',
    upvotes: 142,
    followed: true,
    date: 'Oct 23, 2023 • 11:30 AM',
    timeline: [
      {
        title: 'Report Verified',
        description: 'Status changed to \'In Progress\'',
        date: 'Oct 23, 11:30 AM',
        status: 'completed',
        icon: 'task_alt'
      },
      {
        title: 'Assigned to Crew',
        description: 'Maintenance Team Bravo',
        date: 'Oct 24, 2:15 PM',
        status: 'in_progress',
        icon: 'engineering'
      },
      {
        title: 'Issue Resolved',
        description: 'Pending final inspection',
        date: 'Today, 9:45 AM',
        status: 'pending',
        icon: 'verified'
      }
    ],
    comments: [
      {
        id: 'c1',
        userName: 'Sarah Mitchell',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCICG7pjwubmuTPfVbL2ALssgTNylL1Un_zRxdGBl4x5ncjlYpz5kj3Fu0Z_6kflBVcUoe6Sy6DcakCG0o_tXbNCiURf4hMmFDPVk1jk5WbN338PhcMI-9au5ncjCYBNSizoPSQWObNhXqpwP4or3LC5pXJ9Ba9WpkiGGL7Sq-Xtwa5-pMnnQu-pSWYOHKej_eyH4T-ZkN9eY869B37Lrmzf84G52ifEwfdKDGZtLPGyOB3vFFKBAmN8O3co5i0li636GAkT99ZCRo',
        text: 'I saw city workers surveying the area this morning. Looks like they are finally taking it seriously. Be careful walking there at night!',
        time: '2h ago',
        repliesCount: 0,
        upvotes: 12
      },
      {
        id: 'c2',
        userName: 'David Chen',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEgb81O73Spt-bguLs447WPeEsXoTcdnnZ7A_aby7QsY1kvWnYleTq40K0kQOzngpN-c5_L9sGLpfZi3XaackeAfo2R3csCwITr3upIo133moygKvVL700WoVjFnXexv-DrEGJVzn1CBp9c8Rdi-wagP8zWuMKgcndoIFl1-IjDYZxcH7F5dZBNioq6Qar3hAN7uXek5U1OkR2BsIcJPLfxcDUkilZZYsGXmlwc87PlWJXmkhFuEb8gK9ZHnfw6_tsprZfQs8V14c',
        text: 'This has been an issue for weeks. Glad someone finally reported it with photos. Hopefully, it\'s fixed before the winter freeze.',
        time: '5h ago',
        repliesCount: 0,
        upvotes: 8
      }
    ],
    district: 'District 4'
  },
  {
    id: 'INC-5211',
    title: 'Deep Pothole at Corner of Oak & Main',
    description: 'Extremely deep pothole that fills with water and hides itself during rain. Multiple cyclists have reported near crashes. Immediate attention required.',
    category: 'Infrastructure',
    subcategory: 'Pothole',
    status: 'New',
    statusText: 'Reported 2h ago',
    location: {
      name: 'Corner of Oak & Main St.',
      address: 'Downtown, San Francisco',
      lat: 37.758,
      lng: -122.422,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApj5FUYyRCEx1cqZsNYLW_30nMN0ouYuOv5tGbuOXIhzQ6e1W_ttK5mdNcRC8WMJFhD7RV-Kgyl8pMp_HXb4_SZt2zkEghk-zh3Inh_FU5GLyaKmCNDKvHBxHXDjJ2RMl2-qWJRM35nJyn8q9s3LQtmGhrvFiAiIT0XjHJJcGI8w-PK6exaufxVmO9UfLl9u5ezO1FWpb0sBSrdGUaDaUY098zW0yGmDmdOX77gIbjUkpIwxlXTkAV9uoX5_K9NXe3XfgVa_NNTP8',
    upvotes: 12,
    followed: false,
    date: 'Oct 25, 2023 • 11:15 AM',
    timeline: [
      {
        title: 'Reported Successfully',
        description: 'Automatic triage complete.',
        date: 'Oct 25, 2023 • 11:15 AM',
        status: 'completed',
        icon: 'check_circle'
      }
    ],
    comments: [],
    district: 'District 4'
  },
  {
    id: 'INC-3382',
    title: 'Faded Crossing Paint on Grand Ave',
    description: 'The pedestrian crossing lines near Grand Avenue Elementary School are completely faded. Cars are failing to stop for crossing students. High priority safety concern.',
    category: 'Public Safety',
    subcategory: 'Road Safety',
    status: 'New',
    statusText: 'Reported 1d ago',
    location: {
      name: 'Grand Ave & School Lane',
      address: 'North District',
      lat: 37.792,
      lng: -122.409,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcahex4iFkEP1ZB-xRNMZspwN4X6wibuo0rZIKjvIcoG-JIqVuDCEtYZ8pJIwaqmUvacqGqFE3aFFGy_nG43FMyoAlq513_K-AkAKuFhTi4Rd3zoEoTT0QAZLKxJLCyq4cEM46FAtybxq5C-KY3C7KAVpsCxGe3GNU_BFRgQ4YcPZWP5ZgAlGkaIuOmik53a0wWPHmRXhlQJjzcLsRXNJ7hwyIupclJe1X9tPHlrDgFu9tBuO0vJUveIJBM91G7yLGHCnrpND_idI',
    upvotes: 56,
    followed: false,
    date: 'Oct 24, 2023 • 08:00 AM',
    timeline: [
      {
        title: 'Reported',
        description: 'Queued for public safety evaluation.',
        date: 'Oct 24, 2023',
        status: 'completed',
        icon: 'assignment'
      }
    ],
    comments: [],
    district: 'District 1'
  },
  {
    id: 'INC-1102',
    title: 'Street Light Outage on Pine Road',
    description: 'The streetlight directly in front of 1450 Pine Road has been completely dark for over two weeks, making the street unsafe. Residents have noted increased safety concerns.',
    category: 'Infrastructure',
    subcategory: 'Street Light',
    status: 'Resolved',
    statusText: 'Resolved Yesterday',
    location: {
      name: '1450 Pine Road',
      address: 'Pine Valley',
      lat: 37.742,
      lng: -122.458,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKqayfBogJ_kvfztDXtlOTCnALsU43nPLVzHWD-9qTKJAR3_Acdgqf38BiV0OpqBODFE1DQWQ1qJTGsMqCHJm1iXjNiECnoWjigV9D1i8OOR2hb2_8B7q502TnBOl0fHvNIgHlYaXiKglpF1xBdkrfAL940VpzPHi3BV3U6llMVZd4TJGf7m3Ft5HhkyBNw0U2GP9NujCf8ByjLnRGY9BrOdRDUJjpF01iuWl789KSrxRurG4AA7-OOKDzIe1CrdFchoUnZMHAX5c',
    upvotes: 24,
    followed: false,
    date: 'Oct 22, 2023 • 10:00 PM',
    timeline: [
      {
        title: 'Issue Resolved',
        description: 'Bulb replaced and timer calibrated.',
        date: 'Oct 25, 2023 • 11:30 AM',
        status: 'completed',
        icon: 'verified'
      }
    ],
    comments: [],
    district: 'District 2'
  },
  {
    id: 'INC-9021',
    title: 'Illegal Dumping at Central Park Gate B',
    description: 'A large load of household waste, including broken furniture and dynamic bags, has been dumped on the park trail near Gate B. It is attracting local pests.',
    category: 'Sanitation',
    subcategory: 'Waste',
    status: 'In Progress',
    statusText: 'Dispatched',
    location: {
      name: 'Central Park Gate B',
      address: 'Central District',
      lat: 37.771,
      lng: -122.435,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcahex4iFkEP1ZB-xRNMZspwN4X6wibuo0rZIKjvIcoG-JIqVuDCEtYZ8pJIwaqmUvacqGqFE3aFFGy_nG43FMyoAlq513_K-AkAKuFhTi4Rd3zoEoTT0QAZLKxJLCyq4cEM46FAtybxq5C-KY3C7KAVpsCxGe3GNU_BFRgQ4YcPZWP5ZgAlGkaIuOmik53a0wWPHmRXhlQJjzcLsRXNJ7hwyIupclJe1X9tPHlrDgFu9tBuO0vJUveIJBM91G7yLGHCnrpND_idI',
    upvotes: 18,
    followed: false,
    date: 'Oct 24, 2023 • 01:45 PM',
    timeline: [
      {
        title: 'Reported',
        description: 'Assigned to Sanitation Team C.',
        date: 'Oct 24, 2023',
        status: 'completed',
        icon: 'task_alt'
      }
    ],
    comments: [],
    district: 'District 3'
  },
  {
    id: 'INC-4859',
    title: 'Vandalism and Graffiti on Memorial Wall',
    description: 'Fresh graffiti tags in bright colors on the concrete wall of the park main memorial. Needs sandblasting or removal ASAP prior to upcoming weekend ceremony.',
    category: 'Sanitation',
    subcategory: 'Graffiti',
    status: 'New',
    statusText: 'Received',
    location: {
      name: 'Memorial Wall, Park East',
      address: 'East District',
      lat: 37.735,
      lng: -122.405,
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC20GbiFMzmPp8H-unks-Vnh_7Q19x2zxkWjl9DMEfXxW-Wi7ON0hLJlJyIka3P1x-1lOchUi47A75Gv3ZCNoFj2-Uxc0RcHSSvZZqrzaTpahanZl-mcEiUXKnbHrfYR4zg4WEmV_kUDDu4dZC_PWYdabsdj4z_WHkxUX7B4G2wN-8k3hOnRaUORMMCI5yqacf8K0DTsfiAREG-KQxUBCzNmwMe4Pd9FzUj-vuyPFt8EIPT28QSDsY8XlwdlXI6KJRBobAPSY-XbGA',
    upvotes: 7,
    followed: false,
    date: 'Oct 25, 2023 • 07:45 AM',
    timeline: [
      {
        title: 'Reported',
        description: 'Vandalism incident logged.',
        date: 'Oct 25, 2023',
        status: 'completed',
        icon: 'check_circle'
      }
    ],
    comments: [],
    district: 'District 5'
  }
];
