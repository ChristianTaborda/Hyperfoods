#python3 manage.py tenant_command createsuperuser --schema=test
#./manage.py shell < myscript.py
from tenant.models import Tenant, Domain

URL_SERVER = "hyperfoods.team"
# create your public tenant
tenant = Tenant(schema_name='public',
                name='Hyperfoods Inc.',
                paid_until='2020-12-12',
                type_plan=3,
                on_trial=False)
tenant.save()

# Add one or more domains for the tenant
domain = Domain()
domain.domain = URL_SERVER # don't add your port or www here! on a local server you'll want to use localhost here
domain.tenant = tenant
domain.is_primary = True
domain.save()


# ======= Add one or more domains for the tenant tenant1 
tenant = Tenant(schema_name='tenant1',
                name='Tenant1 Inc.',
                paid_until='2020-12-12',
                type_plan=1,
                on_trial=True)
tenant.save()

domain = Domain()
domain.domain = 'tenant1.'+URL_SERVER # don't add your port or www here! on a local server you'll want to use localhost here
domain.tenant = tenant
domain.is_primary = True
domain.save()


# ======= Add one or more domains for the tenant tenant2
tenant = Tenant(schema_name='tenant2',
                name='Tenant2 Inc.',
                paid_until='2020-12-12',
                type_plan=2,
                on_trial=True)
tenant.save()

domain = Domain()
domain.domain = 'tenant2.'+URL_SERVER # don't add your port or www here! on a local server you'll want to use localhost here
domain.tenant = tenant
domain.is_primary = True
domain.save()


# ======= Add one or more domains for the tenant tenant13
tenant = Tenant(schema_name='tenant3',
                name='Tenant3 Inc.',
                paid_until='2020-12-12',
                type_plan=3,
                on_trial=True)
tenant.save()

domain = Domain()
domain.domain = 'tenant3.'+URL_SERVER # don't add your port or www here! on a local server you'll want to use localhost here
domain.tenant = tenant
domain.is_primary = True
domain.save()