import './Dashboard.css';
import Card from '../Card/Card';

const StatCardDisplay = ({ icon, title, value, change, changeType, menuIcon, iconBgColor, iconColor }) => {
    return (
        <Card className="stat-card-wrapper" actions={null}> {}
            <div className="stat-card-content">
                <div className="stat-card-icon-container">
                    <div className="stat-card-icon-background" style={{ backgroundColor: iconBgColor }}>
                        {/* THAY THẾ ICON THẬT VÀO ĐÂY */}
                        <span className="stat-card-icon" style={{ color: iconColor }}>{icon}</span>
                    </div>
                </div>
                <div className="stat-card-info">
                    <div className="stat-card-title-text">{title}</div>
                    <div className="stat-card-value">{value}</div>
                    <div className={`stat-card-change ${changeType === 'positive' ? 'stat-card-change--positive' : 'stat-card-change--negative'}`}>
                        {changeType === 'positive' ? '↑' : '↓'} {change}
                    </div>
                </div>
            </div>
            {menuIcon && <div className="dashboard-card-menu-dots-absolute">{menuIcon}</div>}
        </Card>
    );
};


const Dashboard = () => {
    const totalRevenueChartData = [
        { month: 'Jan', val2021: 18, val2020: -12 }, { month: 'Feb', val2021: 8, val2020: -18 },
        { month: 'Mar', val2021: 15, val2020: -5 }, { month: 'Apr', val2021: 28, val2020: -10 },
        { month: 'May', val2021: 12, val2020: -3 }, { month: 'Jun', val2021: 10, val2020: -18 },
        { month: 'Jul', val2021: 8, val2020: -15 },
    ];
    const totalRevenueMaxAbsValue = 30;

    return (
        <main className="dashboard-main-content">
            <div className="dashboard-grid-container">
                {/* Row 1 */}
                <Card className="greeting-card dashboard-grid-col-span-2" cardStyle={{ backgroundColor: '#F8F7FA' }} noPadding> {/* Nền khác, noPadding cho card gốc */}
                    <div className="greeting-card-inner-content"> {/* Container nội dung với padding riêng */}
                        <div className="greeting-card-text-content">
                            <h4 className="greeting-card-title">Congratulations John! 🎉</h4>
                            <p className="greeting-card-subtitle">You have done <strong className="greeting-card-highlight">72% more sales</strong> today. Check your new badge in your profile.</p>
                            <button className="greeting-card-view-badges-button">View Badges</button>
                        </div>
                        <div className="greeting-card-illustration-container">
                            <img src="/illustration-placeholder.png" alt="Sales Achievement" className="greeting-card-illustration"/>
                            <div className="greeting-card-clock-placeholder"></div>
                            <div className="greeting-card-plant-placeholder"></div>
                        </div>
                    </div>
                </Card>

                <StatCardDisplay
                    icon="⏱️" title="Profit" value="$12,628" change="+72.80%" changeType="positive" menuIcon="⋮"
                    iconBgColor="#E6F7F0" iconColor="#28C76F"
                />
                <StatCardDisplay
                    icon="💳" title="Sales" value="$4,679" change="+28.42%" changeType="positive" menuIcon="⋮"
                    iconBgColor="#E0F9FC" iconColor="#03C3EC"
                />

                {/* Row 2 & 3 */}
                <Card title="Total Revenue" className="total-revenue-card dashboard-grid-col-span-2"
                      actions={
                          <div className="total-revenue-card-header-actions">
                              <span className="total-revenue-card-legend-item"><span className="total-revenue-card-dot dot-2021"></span> 2021</span>
                              <span className="total-revenue-card-legend-item"><span className="total-revenue-card-dot dot-2020"></span> 2020</span>
                          </div>
                      }>
                    <div className="total-revenue-card-chart-area">
                        <div className="total-revenue-card-y-axis">
                            {[30, 20, 10, 0, -10, -20].map(val => <span key={val}>{val}</span>)}
                        </div>
                        <div className="total-revenue-card-bars-container">
                            {totalRevenueChartData.map(data => (
                                <div key={data.month} className="total-revenue-card-month-group">
                                    {data.val2021 >= 0 && (
                                        <div
                                            className="total-revenue-card-bar bar-2021"
                                            style={{height: (data.val2021 / totalRevenueMaxAbsValue) * 100 + '%'}}
                                        ></div>
                                    )}
                                    <div
                                        className={`total-revenue-card-bar bar-2020 ${data.val2020 < 0 ? 'bar-negative' : 'bar-positive'}`}
                                        style={{height: (Math.abs(data.val2020) / totalRevenueMaxAbsValue) * 100 + '%'}}
                                    ></div>
                                    <span className="total-revenue-card-month-label">{data.month}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </Card>

                <Card className="order-stats-card dashboard-grid-row-span-2" title="Order Statistics"
                      actions={
                          <select className="order-stats-card-year-select" defaultValue="2022">
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                          </select>
                      }>
                    <div className="order-stats-card-chart-section">
                        <div className="order-stats-card-radial-chart-placeholder">
                            <svg viewBox="0 0 36 36" className="order-stats-radial-svg">
                                <path className="order-stats-radial-bg"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="order-stats-radial-progress" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="19.35" className="order-stats-radial-text-percent">78%</text>
                                <text x="18" y="23.35" className="order-stats-radial-text-label">Growth</text>
                            </svg>
                        </div>
                        <p className="order-stats-card-company-growth">62% Company Growth</p>
                    </div>
                    <div className="order-stats-card-details-list">
                        <div className="order-stats-card-detail-item">
                            <span className="order-stats-card-detail-icon icon-bg-2022">$</span>
                            <div>
                                <span className="order-stats-card-detail-label">2022</span>
                                <span className="order-stats-card-detail-value">$32.5k</span>
                            </div>
                        </div>
                        <div className="order-stats-card-detail-item">
                            <span className="order-stats-card-detail-icon icon-bg-2021">📊</span>
                            <div>
                                <span className="order-stats-card-detail-label">2021</span>
                                <span className="order-stats-card-detail-value">$41.2k</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <StatCardDisplay
                    icon="🅿️" title="Payments" value="$2,456" change="-14.82%" changeType="negative" menuIcon="⋮"
                    iconBgColor="#FCE8E9" iconColor="#EA5455"
                />
                <StatCardDisplay
                    icon="🏧" title="Transactions" value="$14,857" change="+28.14%" changeType="positive" menuIcon="⋮"
                    iconBgColor="#E7E7FF" iconColor="#696CFF"
                />

                <Card title="Profile Report" className="profile-report-card dashboard-grid-col-span-2">
                    <div className="profile-report-card-info-header">
                        <span className="profile-report-card-year-badge">YEAR 2021</span>
                        <span className="profile-report-card-change positive"><span className="profile-report-card-arrow-up">↑</span> 68.2%</span>
                    </div>
                    <div className="profile-report-card-main-value">$84,686k</div>
                    <div className="profile-report-card-line-chart-placeholder">
                        <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                            <path d="M0,50 C30,10 70,55 100,30 C130,5 170,45 200,20" stroke="#FFAB00" fill="transparent" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <button className="profile-report-card-upgrade-button">Upgrade to Pro</button>
                </Card>
            </div>
        </main>
    );
};

export default Dashboard;