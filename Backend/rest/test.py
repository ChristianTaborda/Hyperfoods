from app_tenant.models import AppTenant

# create your public tenant
tenant = AppTenant(domain_url="stemen.localhost",
    schema_name='stemen',
                name='stemen.',
                paid_until='2020-12-05',
                on_trial=False)
tenant.save()