import { ReactElement } from 'react';
import SitesOverview from '../sites-overview';
import SitesOverviewContext from '../sites-overview/context';
import type { SitesOverviewContextInterface } from '../sites-overview/types';

import '../style.scss';

export default function DashboardOverview( {
	search,
	currentPage,
	filter,
}: SitesOverviewContextInterface ): ReactElement {
	const context = {
		search,
		currentPage,
		filter,
	};
	return (
		<SitesOverviewContext.Provider value={ context }>
			<SitesOverview />
		</SitesOverviewContext.Provider>
	);
}
