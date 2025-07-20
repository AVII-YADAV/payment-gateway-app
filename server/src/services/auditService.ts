import { prisma } from '../index';

interface AuditLogData {
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export const createAuditLog = async (data: AuditLogData): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        details: data.details,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error to avoid breaking the main flow
  }
};

export const getAuditLogs = async (
  userId?: string,
  action?: string,
  resource?: string,
  page: number = 1,
  limit: number = 50
) => {
  const skip = (page - 1) * limit;

  const where: any = {};
  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (resource) where.resource = resource;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    }),
    prisma.auditLog.count({ where })
  ]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getAuditLogsByDateRange = async (
  startDate: Date,
  endDate: Date,
  userId?: string,
  action?: string,
  resource?: string
) => {
  const where: any = {
    createdAt: {
      gte: startDate,
      lte: endDate
    }
  };

  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (resource) where.resource = resource;

  return await prisma.auditLog.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getAuditStats = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    select: {
      action: true,
      resource: true,
      createdAt: true
    }
  });

  // Group by action
  const actionStats = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by resource
  const resourceStats = logs.reduce((acc, log) => {
    acc[log.resource] = (acc[log.resource] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by date
  const dateStats = logs.reduce((acc, log) => {
    const date = log.createdAt.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalLogs: logs.length,
    actionStats,
    resourceStats,
    dateStats
  };
}; 