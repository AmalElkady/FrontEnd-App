export const settingsMigration = {
  1: previousVersionState => ({
	drawerType: previousVersionState.drawerType,
	themeColor: previousVersionState.themeColor,
	darkTheme: previousVersionState.darkTheme,
	isDirectionRTL: previousVersionState.isDirectionRTL,
	navigationStyle: previousVersionState.navigationStyle,
	horizontalNavPosition: previousVersionState.horizontalNavPosition,
	locale : {
			languageId: previousVersionState.locale.languageId,
			locale: previousVersionState.locale.locale,
			name: previousVersionState.locale.name,
			icon: previousVersionState.locale.icon		
		}
	
  })
};
